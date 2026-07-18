const dns = require("dns");

dns.resolve4("google.com", (err, addresses) => {
  console.log("Google:", err, addresses);
});

dns.resolveSrv("_mongodb._tcp.cluster0.2nwbxsh.mongodb.net", (err, records) => {
  console.log("Mongo SRV:", err, records);
});