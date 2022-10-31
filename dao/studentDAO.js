import mongodb from "mongodb"
const OjeectId = mongodb.ObjectId
let student

export default class StudentDAO{
    static async injectDB(conn) {
        if (student) {
          return
        }
        try {
          student = await conn.db(process.env.RESTREVIEWS_NS).collection("Students")
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in studentDAO: ${e}`,
          )
        }
    }
    
    static async addStudentData(data){
        try{
          return await student.insertOne(data);
          // console.log(data);
          // const options = {ordered:true};
          // return await student.insertMany(data,options);
        }
        catch(e){
            console.error(`Unable to add student data: ${e}`);
            return {error:e};
        }
    }

    static async getStudentData(){
      let cursor;
      try{
        cursor = await student
          .find()
      }catch(e){
        console.error(`Unable to get data,${e}`);
        return { studentData:[]};
      }

      try{
        const studentData = await cursor.toArray();
        return {studentData};
      }catch(e){
        console.error(`Unable to convert to array ${e}`);
      }
      return {studentData:[]};
    }
    
}