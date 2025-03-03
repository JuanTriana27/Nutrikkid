const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://trianajuan28:h94u3wvhZmr82WX8@cluster0.qim4t.mongodb.net/?retryWrites=true&w=majority&appName=NutriKids";

async function testConnection() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log("✅ Conexión exitosa a MongoDB");
        client.close();
    } catch (error) {
        console.error("❌ Error conectando a MongoDB:", error.message);
    }
}

testConnection();
