import { Mail, Phone, MapPin } from 'lucide-react'

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Contact Information</h2>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Mail className="text-primary mt-1 h-5 w-5" />
          <div>
            <p className="font-medium">Email</p>
            <p className="text-muted-foreground text-sm">
              support@blogmint.com
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Phone className="text-primary mt-1 h-5 w-5" />
          <div>
            <p className="font-medium">Phone</p>
            <p className="text-muted-foreground text-sm">+91 9876543210</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="text-primary mt-1 h-5 w-5" />
          <div>
            <p className="font-medium">Location</p>
            <p className="text-muted-foreground text-sm">India</p>
          </div>
        </div>
      </div>
    </div>
  )
}
