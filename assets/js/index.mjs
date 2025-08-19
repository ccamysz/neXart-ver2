import { db } from "../database/db.mjs";
import { get, ref } from "firebase/database";

try {
    const dbRef = ref(db, '/ping');
    const before = Date.now();
    const snapshot = await get(dbRef);
    const after = Date.now();
    const ping = after - before;
    if (!snapshot.exists()) console.log ("No data available");
    const data = snapshot.val();
    console.log("Sucesso ao logar!")
    console.log(`${data} ${ping}ms.`);
} catch (e) {
    console.error("Erro ao logar: ");
}
