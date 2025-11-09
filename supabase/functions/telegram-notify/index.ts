import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface TelegramMessage {
  type: 'new_order' | 'expiry_warning';
  data: {
    order_id?: string;
    customer_name?: string;
    product_name?: string;
    amount?: number;
    whatsapp?: string;
    expires_at?: string;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('TELEGRAM_CHAT_ID');

    if (!botToken || !chatId) {
      throw new Error('Telegram configuration missing');
    }

    const { type, data }: TelegramMessage = await req.json();

    let message = '';

    if (type === 'new_order') {
      message = `🆕 NEW ORDER RECEIVED\n\n` +
        `📦 Product: ${data.product_name}\n` +
        `👤 Customer: ${data.customer_name}\n` +
        `💰 Amount: $${data.amount}\n` +
        `📱 WhatsApp: ${data.whatsapp}\n` +
        `🔑 Order ID: ${data.order_id}\n\n` +
        `⚡ Action required: Verify payment in admin panel`;
    } else if (type === 'expiry_warning') {
      message = `⚠️ SERVER EXPIRING SOON\n\n` +
        `👤 Customer: ${data.customer_name}\n` +
        `📦 Product: ${data.product_name}\n` +
        `📅 Expires: ${data.expires_at}\n` +
        `📱 WhatsApp: ${data.whatsapp}\n\n` +
        `🔔 Please contact customer for renewal`;
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send Telegram message');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Notification sent' }),
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
