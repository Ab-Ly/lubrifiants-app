const { createClient } = require('@supabase/supabase-js');
const { v4: uuid } = require('uuid');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
exports.handler = async (e) => {
  try {
    const b = JSON.parse(e.body || '{}');
    const id = 'S' + uuid().slice(0,8);
    const qty = +b.qty || 0, pu = +b.pu || 0;
    const date = b.date || new Date().toISOString().slice(0,10);
    const montant = +(qty * pu).toFixed(2);
    const { error } = await supabase.rpc('create_sale_and_decrement_stock', {
      sale_id: id, sale_date: date, sale_type: b.type, article_id: b.articleId || null,
      article_name: b.articleName || null, client: b.client || null, qty, pu, montant
    });
    if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    return { statusCode: 200, body: JSON.stringify({ ok: true, id, montant }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
