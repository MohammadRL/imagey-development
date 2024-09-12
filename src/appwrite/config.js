import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getImageRecord(imageID) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        imageID
      );
    } catch (error) {
      console.log("Appwrite service :: getImageRecord() :: ", error);
      return false;
    }
  }

  async getImagesRecords(userID) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("userID", userID)]
      );
    } catch (error) {
      console.log("Appwrite service :: getImagesRecords() :: ", error);
      return false;
    }
  }

  async createImageRecord({ userID, imageName }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        imageName,
        {
          userID,
          imageName,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createImageRecord() :: ", error);
      return false;
    }
  }

  async updateRecord(id, { imageName }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id,
        {
          imageName,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateRecord() :: ", error);
      return false;
    }
  }

  async deleteRecord(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteRecord() :: ", error);
      return false;
    }
  }

  // storage service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile() :: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: deleteFile() :: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
  }
}

const service = new Service();
export default service;
