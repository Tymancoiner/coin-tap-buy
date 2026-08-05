export default async function handler(req, res) {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  if (!BOT_TOKEN) return res.status(500).json({error:"No BOT_TOKEN"});
  const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      title:"1000 Coins Pack",
      description:"Get 1000 coins",
      payload:"coins_"+Date.now(),
      currency:"XTR",
      prices:[{label:"1000 Coins", amount:100}]
    })
  });
  const data = await r.json();
  if(!data.ok) return res.status(500).json(data);
  res.json({invoiceLink:data.result});
}
