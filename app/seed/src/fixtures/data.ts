function doc(...paragraphs: string[]) {
  return {
    type: 'doc',
    content: paragraphs.map((text) => ({ type: 'paragraph', content: [{ type: 'text', text }] })),
  };
}

export const dataFixtures = {
  employees: {
    emp_1: {
      status: 'published',
      email: 'j.mueller@styrotec.example',
      tel: '+49 30 555 0100',
      picture: '@img:emp_1',
      contact_picture: '@img:emp_1',
      translations: [
        { languages_code: 'de-DE', name: 'Julia Müller', position: 'Vertriebsleiterin' },
        { languages_code: 'en-US', name: 'Julia Müller', position: 'Head of Sales' },
      ],
    },
    emp_2: {
      status: 'published',
      email: 't.weber@styrotec.example',
      tel: '+49 30 555 0101',
      picture: '@img:emp_2',
      contact_picture: '@img:emp_2',
      translations: [
        { languages_code: 'de-DE', name: 'Thomas Weber', position: 'Technischer Leiter' },
        { languages_code: 'en-US', name: 'Thomas Weber', position: 'Technical Director' },
      ],
    },
    emp_3: {
      status: 'published',
      email: 's.schmidt@styrotec.example',
      tel: '+49 30 555 0102',
      picture: '@img:emp_3',
      contact_picture: '@img:emp_3',
      translations: [
        { languages_code: 'de-DE', name: 'Sabine Schmidt', position: 'Kundenbetreuung' },
        { languages_code: 'en-US', name: 'Sabine Schmidt', position: 'Customer Success' },
      ],
    },
  } as Record<string, Record<string, unknown>>,
  brochures: {
    brochure_1: {
      status: 'published',
      thumbnail: '@img:doc_brochure',
      file: '@img:doc_brochure',
      translations: [
        { languages_code: 'de-DE', title: 'Firmenbroschüre 2026' },
        { languages_code: 'en-US', title: 'Company Brochure 2026' },
      ],
    },
    brochure_2: {
      status: 'published',
      thumbnail: '@img:doc_datasheet',
      file: '@img:doc_datasheet',
      translations: [
        { languages_code: 'de-DE', title: 'Portalfräsmaschinen Übersicht' },
        { languages_code: 'en-US', title: 'Gantry Machines Overview' },
      ],
    },
  } as Record<string, Record<string, unknown>>,
  downloads: {
    download_1: {
      status: 'published',
      sort_order: 1,
      file: '@img:doc_datasheet',
      translations: [
        { languages_code: 'de-DE', title: 'Datenblatt FS10', description: 'Technisches Datenblatt' },
        { languages_code: 'en-US', title: 'Datasheet FS10', description: 'Technical datasheet' },
      ],
    },
    download_2: {
      status: 'published',
      sort_order: 2,
      file: '@img:doc_brochure',
      translations: [
        { languages_code: 'de-DE', title: 'Wartungsanleitung', description: 'Wartung und Service' },
        { languages_code: 'en-US', title: 'Maintenance manual', description: 'Maintenance and service' },
      ],
    },
  } as Record<string, Record<string, unknown>>,
  fairs: {
    fair_1: {
      status: 'published',
      start_date: '2026-09-14',
      end_date: '2026-09-18',
      external_link: 'https://amb-messe.de',
      translations: [
        {
          languages_code: 'de-DE',
          name: 'AMB Stuttgart',
          city: 'Stuttgart',
          description: 'Internationale Ausstellung für Metallbearbeitung',
        },
        {
          languages_code: 'en-US',
          name: 'AMB Stuttgart',
          city: 'Stuttgart',
          description: 'International exhibition for metalworking',
        },
      ],
    },
    fair_2: {
      status: 'published',
      start_date: '2026-11-05',
      end_date: '2026-11-08',
      external_link: 'https://k-online.com',
      translations: [
        {
          languages_code: 'de-DE',
          name: 'K Düsseldorf',
          city: 'Düsseldorf',
          description: 'Weltleitmesse Kunststoff und Kautschuk',
        },
        {
          languages_code: 'en-US',
          name: 'K Düsseldorf',
          city: 'Düsseldorf',
          description: 'World leading trade fair for plastics and rubber',
        },
      ],
    },
  } as Record<string, Record<string, unknown>>,
  jobAds: {
    job_1: {
      status: 'published',
      sort_order: 1,
      translations: [
        {
          languages_code: 'de-DE',
          title: 'CNC-Facharbeiter (m/w/d)',
          description: 'Vollzeit, Baienfurt',
          content: doc(
            'Sie programmieren und rüsten unsere CNC-Bearbeitungszentren und fertigen anspruchsvolle Einzelteile und Kleinserien.',
            'Ihr Profil: abgeschlossene Ausbildung als Zerspanungsmechaniker, Erfahrung mit Siemens- oder Heidenhain-Steuerungen, selbstständige Arbeitsweise.',
            'Wir bieten unbefristete Anstellung, 30 Tage Urlaub und Weiterbildung.',
          ),
        },
        {
          languages_code: 'en-US',
          title: 'CNC Specialist (m/f/d)',
          description: 'Full-time, Baienfurt',
          content: doc(
            'You program and set up our CNC machining centers and produce demanding single parts and small series.',
            'Your profile: completed apprenticeship as a machining specialist, experience with Siemens or Heidenhain controls, independent working style.',
            'We offer permanent employment, 30 days of vacation and further training.',
          ),
        },
      ],
    },
    job_2: {
      status: 'published',
      sort_order: 2,
      translations: [
        {
          languages_code: 'de-DE',
          title: 'Servicetechniker Außendienst (m/w/d)',
          description: 'Vollzeit, Reisetätigkeit DACH',
          content: doc(
            'Sie nehmen unsere Portalfräsmaschinen beim Kunden in Betrieb, führen Wartungen durch und beheben Störungen mechanisch wie elektrisch.',
            'Ihr Profil: Techniker oder Meister im Bereich Mechatronik/Elektrotechnik, Reisebereitschaft, Führerschein Klasse B.',
          ),
        },
        {
          languages_code: 'en-US',
          title: 'Field Service Technician (m/f/d)',
          description: 'Full-time, travel within DACH region',
          content: doc(
            'You commission our gantry mills at customer sites, perform maintenance and resolve mechanical and electrical faults.',
            'Your profile: technician or master craftsman in mechatronics/electrical engineering, willingness to travel, class B driving license.',
          ),
        },
      ],
    },
    job_3: {
      status: 'published',
      sort_order: 3,
      translations: [
        {
          languages_code: 'de-DE',
          title: 'Ausbildung Industriemechaniker (m/w/d)',
          description: 'Ausbildungsstart September, Baienfurt',
          content: doc(
            'Dreieinhalb Jahre Ausbildung in unserer Fertigung: Drehen, Fräsen, Montage und Inbetriebnahme kompletter Maschinen.',
            'Bei guter Leistung ist die Übernahme in ein unbefristetes Arbeitsverhältnis die Regel.',
          ),
        },
        {
          languages_code: 'en-US',
          title: 'Apprenticeship Industrial Mechanic (m/f/d)',
          description: 'Starting September, Baienfurt',
          content: doc(
            'Three and a half years of training in our production: turning, milling, assembly and commissioning of complete machines.',
            'With good performance, permanent employment after the apprenticeship is the rule.',
          ),
        },
      ],
    },
  } as Record<string, Record<string, unknown>>,
  socialMediaChannels: {
    social_linkedin: {
      status: 'published',
      name: 'LinkedIn',
      external_link: 'https://linkedin.com/company/styrotec',
    },
    social_youtube: {
      status: 'published',
      name: 'YouTube',
      external_link: 'https://youtube.com/@styrotec',
    },
  } as Record<string, Record<string, unknown>>,
  testimonials: {
    testimonial_1: {
      status: 'published',
      timestamp: '2026-03-15',
      thumbnail: '@img:about_team',
      translations: [
        {
          languages_code: 'de-DE',
          name: 'Klaus Fischer, Maschinenbau GmbH',
          testimonial: {
            type: 'doc',
            content: [
              { type: 'paragraph', content: [{ type: 'text', text: 'Herausragende Qualität und Service.' }] },
            ],
          },
        },
        {
          languages_code: 'en-US',
          name: 'Klaus Fischer, Maschinenbau GmbH',
          testimonial: {
            type: 'doc',
            content: [
              { type: 'paragraph', content: [{ type: 'text', text: 'Outstanding quality and service.' }] },
            ],
          },
        },
      ],
    },
  } as Record<string, Record<string, unknown>>,
};
