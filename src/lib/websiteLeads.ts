export interface WebsiteLead {
  fullName: string
  businessEmail: string
  companyName: string
  phoneNumber: string
  industry: string
  solutionOfInterest: string
  requirements: string
  consentGiven: boolean
}

const websiteLeadsEndpoint =
  'https://apiv2-test.snapbizz.com/v5/api/website-leads/submit'

export async function submitWebsiteLead(lead: WebsiteLead): Promise<void> {
  const response = await fetch(websiteLeadsEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ...lead,
      iscontacted: false,
      leadStatus: 'NEW',
    }),
  })

  if (!response.ok) {
    throw new Error(`Lead submission failed with status ${response.status}.`)
  }
}
