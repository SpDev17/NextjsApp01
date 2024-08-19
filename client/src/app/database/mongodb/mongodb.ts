//https://github.com/choutkamartin/next-auth-mongoose/blob/main/lib/mongoose.js
///

import mongoose from 'mongoose';
const { MONGODB_URI, MONGODB_URI1 } = require('../../shared/envconfig');
export default async function mongooseConnect(): Promise<void> {
  const mongoDBURI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(mongoDBURI);
  }

}