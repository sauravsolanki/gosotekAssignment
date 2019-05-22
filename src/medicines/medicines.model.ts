import * as mongoose from 'mongoose';
// import Post from './medicines.interface';
import Medicine from './medicines.interface';


const medicineSchema =new mongoose.Schema({
  hsnCode: String,
  form: String,
  api: String,
  rPrescriped: String,
  compName: String,
  brandName: String,
}); 


// const postSchema = new mongoose.Schema({
//   author: String,
//   content: String,
//   title: String,
// });

// const postModel = mongoose.model<Post & mongoose.Document>('Post', postSchema);
const medicineModel = mongoose.model<Medicine & mongoose.Document>('Medicine', medicineSchema);

export default medicineModel;
