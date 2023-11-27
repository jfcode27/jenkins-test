import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query} from "firebase/firestore";
import { db } from "@config/firebase.config";
import { Result } from "@common/api-interfaces/Result"; 
import { StatusCodes } from "@common/enums/enums";

export default class FirebaseHelper<Result extends Record<string, any>> {
    private collectionName: string;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
    }

    public async add(data: Result){
        try {
            await addDoc(collection(db, this.collectionName), { ...data });
            return new Result("Documento agregado correctamente", StatusCodes.OK, data);
        } catch (error) {
            throw new Error(`Error al añadir documento: ${error}`);
        }
    }

    public async getById(id: string){
        try {
            const docRef = doc(db, this.collectionName, id);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()){
                return new Result("El documento no existe", StatusCodes.BAD_REQUEST);
            }
            return new Result("Documento encontrado", StatusCodes.OK, docSnap.data());
        } catch (error) {
            throw new Error(`Error al obtener por id el documento: ${error}`);
        }
    }
    
    public async update(id: string, data: Result){
        try {
            const docRef = await getDoc(doc(db, this.collectionName, id));
            if (!docRef.exists()){
                return new Result("El documento no existe", StatusCodes.BAD_REQUEST);
            }
            await updateDoc(doc(db, this.collectionName, id), { ...data });
            const resp = await getDoc(doc(db, this.collectionName, id));
            const dataResp = resp.data();
            return new Result("Documento actualizado correctamente", StatusCodes.OK, dataResp);
        } catch (error) {
            throw new Error(`Error al actualizar el documento: ${error}`);
        }
    }

    public async delete(id: string){
        try {
            const resp = await getDoc(doc(db,this.collectionName, id));
            if (!resp.exists()){
                return new Result("El documento no existe", StatusCodes.BAD_REQUEST);
            }
            const docDeleted = resp.data();
            await deleteDoc(doc(db,this.collectionName, id));
            return new Result("Documento eliminado correctamente", StatusCodes.OK, docDeleted);
        } catch (error) {
            throw new Error(`Error al eliminar el documento: ${error}`);
        }
    }

    public async getAllDocs(){
        try {
            const qry = query(collection(db, this.collectionName));
            const querySnapshot = await getDocs(qry);
            const results: Result[] = [];
            if (querySnapshot.empty) {
                return new Result("No se encontraron documentos", StatusCodes.BAD_REQUEST); 
            }
            querySnapshot.forEach((doc) => {
                const data = doc.data() as Result;
                results.push(data);
            });
            return new Result("Documentos encontrados", StatusCodes.OK, results);
        } catch (error) {
            throw new Error(`Error al obtener todos los documentos: ${error}`);
        }
    }
}

