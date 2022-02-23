module.exports = (env) => {
  const mode = env.prod === "true" ? "prod" : "dev";
  return require(`./webpack.config.${mode}.js`)
}