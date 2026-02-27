export async function json(req, res) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    const buffersConcat = Buffer.concat(buffers).toString();
    req.body = JSON.parse(buffersConcat);
  } catch (error) {
    req.body = null;
  }

  res.setHeader("Content-type", "application/json");
}
