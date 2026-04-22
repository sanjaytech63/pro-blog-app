import mongoose, { Schema, models } from 'mongoose'

const contactSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
})

contactSchema.index({ fullname: 1 })
contactSchema.index({ email: 1 })
contactSchema.index({ subject: 1 })
contactSchema.index({ createdAt: -1 })

const Contact = models.Contact || mongoose.model('Contact', contactSchema)
export default Contact
