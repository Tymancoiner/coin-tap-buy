export default async function handler(req, res) {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  if (!BOT_TOKEN) return res.status(500).json({error:"No BOT_TOKEN env"});

  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      title: "1000 Coins",
      description: "Get 1000 coins for Coin Tap",
      payload: "1000_coins",
      currency: "XTR", // Telegram Stars
      prices: [{label: "1000 Coins", amount: 100 }] // 100 Stars = ~$1-2
    })
  });
  const data = await response.json();
  if (!data.ok) return res.status(500).json(data);
  res.json({invoiceLink: data.result});
}
