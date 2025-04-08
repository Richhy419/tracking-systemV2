"use server"

interface QuoteRequestData {
  firstName: string
  lastName: string
  email: string
  serviceType: string
}

export async function sendQuoteRequest(data: QuoteRequestData) {
  try {
    // In a real application, you would send an email here
    // For example, using a service like SendGrid, Mailgun, or AWS SES

    // Example implementation with a hypothetical email service:
    // await emailService.send({
    //   to: "family.support.grant@gmail.com",
    //   from: "website@grantflowexpress.com",
    //   subject: `Quote Request from ${data.firstName} ${data.lastName}`,
    //   text: `
    //     New quote request:
    //     Name: ${data.firstName} ${data.lastName}
    //     Email: ${data.email}
    //     Service Type: ${data.serviceType}
    //   `
    // });

    // For demo purposes, we'll just log the data and simulate a delay
    console.log("Quote request received:", data)
    console.log("Email will be sent to: family.support.grant@gmail.com")

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
  } catch (error) {
    console.error("Failed to send quote request:", error)
    throw new Error("Failed to send your quote request. Please try again later.")
  }
}
