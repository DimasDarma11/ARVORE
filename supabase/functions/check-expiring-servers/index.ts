import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const warningDays = 7;
    const warningDate = new Date();
    warningDate.setDate(warningDate.getDate() + warningDays);

    const { data: expiringOrders, error } = await supabase
      .from('orders')
      .select(`
        id,
        expires_at,
        profiles (full_name, whatsapp_number),
        products (name)
      `)
      .eq('status', 'active')
      .lte('expires_at', warningDate.toISOString())
      .gte('expires_at', new Date().toISOString());

    if (error) throw error;

    const notificationsSent = [];

    for (const order of expiringOrders || []) {
      const notifyUrl = `${supabaseUrl}/functions/v1/telegram-notify`;

      try {
        const response = await fetch(notifyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'expiry_warning',
            data: {
              customer_name: order.profiles.full_name,
              product_name: order.products.name,
              expires_at: new Date(order.expires_at).toLocaleDateString(),
              whatsapp: order.profiles.whatsapp_number,
            },
          }),
        });

        if (response.ok) {
          notificationsSent.push(order.id);
        }
      } catch (err) {
        console.error(`Failed to send notification for order ${order.id}:`, err);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        checked: expiringOrders?.length || 0,
        notified: notificationsSent.length,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
