import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import Medicine from './medicines.interface';
import medicineModel from './medicines.model';
// import medicine model
// MedicinesController



class MedicinesController implements Controller {
  public path = '/medicines';
  public router = express.Router();
  private medicine = medicineModel;

  private m: Medicine= {
  hsnCode: "843723534",
  form: "capsules",
  api: "500 mg",
  rPrescriped: "no",
  compName: "ASD Company",
  brandName: "MIOL",
    };

  // private m= new Medicine({
  // hsnCode: "1235458474658",
  // form: "tablet",
  // api: "250 mg",
  // rPrescriped: "yes",
  // compName: "XYZ Company",
  // brandName: "TherFlasX",
  //   });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllMedicines);
    this.router.get(`${this.path}/:id`, this.getMedicineById);
    this.router.put(`${this.path}/:id`, this.modifyMedicine);
    this.router.delete(`${this.path}/:id`, this.deleteMedicine);
    this.router.post(this.path, this.createMedicine);
    // this.router.post(`${this.path}/createone`, this.createAMedRecord);
  }

  private getAllMedicines = (request: express.Request, response: express.Response) => {
    this.medicine.find()
      .then((medicines) => {
        response.send(medicines);
      });
  }

  private getMedicineById = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.medicine.findById(id)
      .then((medicine) => {
        response.send(medicine);
      });
  }

  private modifyMedicine = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const medData: Medicine = request.body;
    this.medicine.findByIdAndUpdate(id, medData, { new: true })
      .then((medicine) => {
        response.send(medicine);
      });
  }

  private createMedicine = (request: express.Request, response: express.Response) => {
    console.log("\n"+request.body)
    
    const medData: Medicine = request.body;
    console.log("\n"+medData)

    const createdMed = new medicineModel(medData);
    console.log("\n"+createdMed)
    createdMed.save()
      .then((savedMedicine) => {
        response.send(savedMedicine);
      });


      // createdMed.save(function (err, med: any) {
      //   if (err) return console.error(err);
      //   console.log(" saved to med collection.");
      // });


  }

  private deleteMedicine = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.medicine.findByIdAndDelete(id)
      .then((successResponse) => {
        if (successResponse) {
          response.send(200);
        } else {
          response.send(404);
        }
      });
  }

  createAMedRecord = (request: express.Request, response: express.Response) => {
    const createdMed = new this.medicine(this.m);
    createdMed.save()
      .then((savedMedicine) => {
        response.send(savedMedicine);
      });
  }
}

export default MedicinesController;
