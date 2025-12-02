const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
exports.handler = async () => {
  try {
    const { data, error } = await supabase.from('stock').select('pu,stock');
    if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    const total = (data || []).reduce((acc, r) => acc + Number(r.pu || 0) * Number(r.stock || 0), 0);
    return { statusCode: 200, body: JSON.stringify({ total }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
