CREATE OR REPLACE FUNCTION create_sale_and_decrement_stock(
  sale_id text,
  sale_date date,
  sale_type text,
  article_id text,
  article_name text,
  client text,
  qty integer,
  pu numeric,
  montant numeric
) RETURNS void AS $$
BEGIN
  INSERT INTO public.sales (id,date,type,article_id,article_name,client,qty,pu,montant)
  VALUES (sale_id,sale_date,sale_type,article_id,article_name,client,qty,pu,montant);

  IF sale_type='lub' AND article_id IS NOT NULL THEN
    UPDATE public.stock SET stock = stock - qty WHERE id = article_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
