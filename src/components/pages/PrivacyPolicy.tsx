interface PolicySection {
  title: string
  paragraphs: { lead?: string; text: string }[]
}

const sections: PolicySection[] = [
  {
    title: 'Information we collect',
    paragraphs: [
      { lead: 'Contact information.', text: 'We might collect your name, email, mobile number, phone number, street, city, state, Pincode, country, and IP address.' },
      { lead: 'Information you post.', text: 'We collect the information you post in a public space on our website or on a third-party social media site belonging to www.snapbizz.com' },
      { lead: 'Demographic information.', text: 'We may collect demographic information about you, events you like, events you intend to participate in, tickets you buy, or any other information provided by you during the use of our website. We might collect this as a part of a survey also.' },
      { lead: 'Other information.', text: 'If you use our website, we may collect information about your IP address and the browser you’re using. We might look at what site you came from, the duration of time spent on our website, pages accessed, or what site you visit when you leave us. We might also collect the type of mobile device you are using, or the version of the operating system your computer or device is running.' },
    ],
  },
  {
    title: 'We collect information in different ways.',
    paragraphs: [
      { lead: 'We collect information directly from you.', text: 'We also collect information if you post a comment on our websites or ask us a question through phone or email.' },
      { lead: 'We collect information from you passively.', text: 'We use tracking tools like Google Analytics, Google Webmaster, browser cookies, and web beacons for collecting information about your usage of our website.' },
      { lead: 'We get information about you from third parties.', text: 'For example, if you use an integrated social media feature on our websites. The third-party social media site will give us certain information about you. This could include your name and email address.' },
    ],
  },
  {
    title: 'Use of your personal information',
    paragraphs: [
      { lead: 'We use the information to contact you:', text: 'We might use the information you provide to contact you for confirmation of a purchase on our website or for other promotional purposes.' },
      { lead: 'We use the information to respond to your requests or questions.', text: 'We might use your information to confirm your registration for an event or contest.' },
      { lead: 'We use the information to improve our products and services.', text: 'We might use your information to customize your experience with us. This could include displaying content based upon your preferences.' },
      { lead: 'We use the information to look at site trends and customer interests.', text: 'We may use your information to make our website and products better. We may combine the information we get from you with information about you we get from third parties.' },
      { lead: 'We use the information for security purposes.', text: 'We may use the information to protect our company, our customers, or our websites.' },
      { lead: 'We use the information for marketing purposes.', text: 'We might send you information about special promotions or offers. We might also tell you about new features or products. These might be our own offers or products, or third-party offers or products we think you might find interesting. Or, for example, if you buy tickets from us we’ll enroll you in our newsletter.' },
      { lead: 'We use the information to send you transactional communications.', text: 'We might send you emails or SMS about your account or a ticket purchase.' },
      { lead: 'DND or DNC or NCPR:', text: 'If you have registered yourself under DND or DNC or NCPR service, you would still authorize SnapBizz to call for the above-mentioned purposes at least till 365 days of your registration with us' },
      { text: 'We use information as otherwise permitted by law.' },
    ],
  },
  {
    title: 'Sharing of information with third-parties',
    paragraphs: [
      { lead: 'We will share information with third parties who perform services on our behalf.', text: 'We share information with vendors who help us manage our online registration process or payment processors or transactional message processors. Some vendors may be located outside of India.' },
      { lead: 'We will share information with our business partners.', text: 'This includes a third party who provide or sponsor an event, or who operates a venue where we hold events. Our partners use the information we give them as described in their privacy policies.' },
      { lead: 'We may share information if we think we have to in order to comply with the law or to protect ourselves.', text: 'We will share information to respond to a court order or subpoena. We may also share it if a government agency or investigatory body requests it. Or, we might also share information when we are investigating potential fraud.' },
      { lead: 'We may share information with any successor to all or part of our business.', text: 'For example, if part of our business is sold we may give our customer list as part of that transaction.' },
      { lead: 'We may share your information for reasons not described in this policy.', text: 'We will tell you before we do this.' },
    ],
  },
  {
    title: 'Email Opt-Out',
    paragraphs: [
      { lead: 'You can opt-out of receiving our marketing emails.', text: 'To stop receiving our promotional emails, please email market@snapbizz.com. It may take about ten days to process your request. Even if you opt out of getting marketing messages, we will still be sending you transactional messages through email and SMS about your purchases.' },
    ],
  },
  {
    title: 'Third-party sites',
    paragraphs: [
      { text: 'If you click on one of the links to third party websites, you may be taken to websites we do not control. This policy does not apply to the privacy practices of those websites. Read the privacy policy of other websites carefully. We are not responsible for these third party sites.' },
    ],
  },
  {
    title: 'Grievance Officer',
    paragraphs: [
      { text: 'In accordance with Information Technology Act 2000 and rules made thereunder, the name and contact details of the Grievance Officer are provided below:' },
      { text: 'Mr. Prem Kumar' },
      { text: 'No.5/1, Gulmohar Enclave, Kundanahalli Gate, Marathahalli Post, Bengaluru – 560037' },
      { text: 'Email: pkumar@snapbizz.com' },
      { text: 'If you have any questions about this Policy or other privacy concerns, you can also email us at market@snapbizz.com' },
    ],
  },
  {
    title: 'Updates to this policy',
    paragraphs: [
      { text: 'This Privacy Policy was last updated on 08.April.2021. From time to time we may change our privacy practices. We will notify you of any material changes to this policy as required by law. We will also post an updated copy on our website. Please check our site periodically for updates.' },
    ],
  },
  {
    title: 'Jurisdiction',
    paragraphs: [
      { text: 'If you choose to visit the website, your visit and any dispute over privacy is subject to this Policy and the website’s terms of use. In addition to the foregoing, any disputes arising under this Policy shall be governed by the laws of India.' },
    ],
  },
]

function PolicyText({ text }: { text: string }) {
  return text.split(/((?:https:\/\/)?www\.snapbizz\.com|(?:market|pkumar)@snapbizz\.com)/g).map((part, index) => {
    const email = part === 'market@snapbizz.com' || part === 'pkumar@snapbizz.com'
    const website = part === 'https://www.snapbizz.com' || part === 'www.snapbizz.com'
    if (!email && !website) return part
    return (
      <a key={index} href={email ? `mailto:${part}` : 'https://www.snapbizz.com'} className="break-words font-medium text-brand-blue-dark underline decoration-brand-blue/40 underline-offset-4 hover:decoration-brand-blue">
        {part}
      </a>
    )
  })
}

export function PrivacyPolicy() {
  return (
    <>
      <article className="space-y-4 rounded-2xl border border-line bg-white p-6 leading-relaxed shadow-sm sm:p-8">
        <p>
          <PolicyText text="SnapBizz Cloudtech Pvt. Ltd. recognizes the importance of maintaining your privacy. We value your privacy and appreciate your trust in us. This Policy describes how we treat user information we collect on https://www.snapbizz.com and other offline sources. This Privacy Policy applies to current and former visitors to our website and to our online customers. By visiting and/or using our website, you agree to this Privacy Policy." />
        </p>
        <p>
          <PolicyText text="www.snapbizz.com is a property of SnapBizz Cloudtech Pvt. Ltd., an Indian Company registered under the Companies Act, 2013 having its registered office at No.5/1, Gulmohar Enclave, Kundanahalli Gate, Marathahalli Post, Bengaluru – 560037" />
        </p>
      </article>
      {sections.map((section) => (
        <article key={section.title} className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold">{section.title}</h2>
          <div className="mt-4 space-y-4 leading-relaxed">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.lead ?? paragraph.text}>
                {paragraph.lead ? <><strong className="font-semibold text-ink-700">{paragraph.lead}</strong>{' '}</> : null}
                <PolicyText text={paragraph.text} />
              </p>
            ))}
          </div>
        </article>
      ))}
    </>
  )
}
