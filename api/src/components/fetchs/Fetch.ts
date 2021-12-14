import mongoose, { model, Schema, Document } from 'mongoose'

const fetchSchema: Schema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    modelName: {
      type: String,
      required: true,
    },
    interval: {
      type: Number,
      required: true,
    },
    availableFetchs: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

type ModelName = 'Crypto'

export interface FetchModel extends Document {
  id: number
  modelName: ModelName
  interval: number
  availableFetchs: number
  createdAt: Date
  updatedAt: Date
}

export default model<FetchModel>('Fetch', fetchSchema)
