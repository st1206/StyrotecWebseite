import type CookieConsent from 'vanilla-cookieconsent';
/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
export const cookiesConfig: CookieConsent.CookieConsentConfig = {
	// root: 'body',
	// autoShow: true,
	// disablePageInteraction: true,
	// hideFromBots: true,
	// mode: 'opt-in',
	// revision: 0,

	cookie: {
		name: 'cc_cookie'
		// domain: location.hostname,
		// path: '/',
		// sameSite: "Lax",
		// expiresAfterDays: 182,
	},

	// https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
	guiOptions: {
		consentModal: {
			layout: 'cloud inline',
			position: 'bottom center',
			equalWeightButtons: false,
			flipButtons: false
		},
		preferencesModal: {
			layout: 'box',
			equalWeightButtons: false,
			flipButtons: false
		}
	},

	onFirstConsent: ({ cookie }) => {
		// console.log('onFirstConsent fired', cookie);
	},

	onConsent: ({ cookie }) => {
		// console.log('onConsent fired!', cookie);
	},

	onChange: ({ changedCategories, changedServices }) => {
		// console.log('onChange fired!', changedCategories, changedServices);
	},

	onModalReady: ({ modalName }) => {
		// console.log('ready:', modalName);
	},

	onModalShow: ({ modalName }) => {
		// console.log('visible:', modalName);
	},

	onModalHide: ({ modalName }) => {
		// console.log('hidden:', modalName);
	},

	categories: {
		necessary: {
			enabled: true, // this category is enabled by default
			readOnly: true // this category cannot be disabled
		}
		// analytics: {
		// 	autoClear: {
		// 		cookies: [
		// 			{
		// 				name: /^_ga/ // regex: match all cookies starting with '_ga'
		// 			},
		// 			{
		// 				name: '_gid' // string: exact cookie name
		// 			}
		// 		]
		// 	},

		// 	// https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
		// 	services: {
		// 		ga: {
		// 			label: 'Google Analytics',
		// 			onAccept: () => {},
		// 			onReject: () => {}
		// 		}
		// 	}
		// }
		// ads: {}
	},

	language: {
		default: 'de',
		autoDetect: 'browser',
		translations: {
			en: {
				consentModal: {
					title: 'Privacy Settings',
					description:
						'This site uses consent-requiring cookies and third-party technologies to integrate certain features. When you click the "Accept All" button, these features are enabled (consent). After consent is given, we and the involved third-party companies process your personal data for various purposes. You can revoke your consent at any time.',
					acceptAllBtn: 'Accept all',
					acceptNecessaryBtn: 'Reject all',
					showPreferencesBtn: 'Manage preferences',
					closeIconLabel: 'Reject all and close modal',
					footer: `
                        <a href="/impressum">Legal Notice</a>
                        <a href="/datenschutz">Privacy Policy</a>
                    `
				},
				preferencesModal: {
					title: 'Manage cookie preferences',
					acceptAllBtn: 'Accept all',
					acceptNecessaryBtn: 'Reject all',
					savePreferencesBtn: 'Accept current selection',
					closeIconLabel: 'Close modal',
					serviceCounterLabel: 'Service|Services',
					sections: [
						{
							title: 'Your Privacy Choices',
							description: `In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided link. To deny your consent to the specific processing activities described below, switch the toggles to off or use the “Reject all” button and confirm you want to save your choices.`
						},
						{
							title: 'Strictly Necessary',
							description:
								'These cookies are essential for the proper functioning of the website and cannot be disabled.',
							//this field will generate a toggle linked to the 'necessary' category
							linkedCategory: 'necessary'
						},
						// {
						// 	title: 'Performance and Analytics',
						// 	description:
						// 		'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
						// 	linkedCategory: 'analytics',
						// 	cookieTable: {
						// 		caption: 'Cookie table',
						// 		headers: {
						// 			name: 'Cookie',
						// 			domain: 'Domain',
						// 			desc: 'Description'
						// 		},
						// 		body: [
						// 			{
						// 				name: '_ga',
						// 				// domain: location.hostname,
						// 				desc: 'Description 1'
						// 			},
						// 			{
						// 				name: '_gid',
						// 				// domain: location.hostname,
						// 				desc: 'Description 2'
						// 			}
						// 		]
						// 	}
						// },
						// {
						// 	title: 'Targeting and Advertising',
						// 	description:
						// 		'These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
						// 	linkedCategory: 'ads'
						// },
						{
							title: 'More information',
							description:
								'For any queries in relation to our policy on cookies and your choices, please <a href="#contact-page">contact us</a>'
						}
					]
				}
			},
			de: {
				consentModal: {
					title: 'Datenschutzeinstellungen',
					description:
						'Diese Website verwendet zustimmungspflichtige Cookies und Technologien von Drittanbietern, um bestimmte Funktionen zu integrieren. Wenn Sie auf "Alle akzeptieren" klicken, werden diese Funktionen aktiviert (Einwilligung). Nach Ihrer Einwilligung verarbeiten wir und die beteiligten Drittunternehmen Ihre personenbezogenen Daten zu verschiedenen Zwecken. Sie können Ihre Einwilligung jederzeit widerrufen.',
					acceptAllBtn: 'Alle akzeptieren',
					acceptNecessaryBtn: 'Alle ablehnen',
					showPreferencesBtn: 'Einstellungen verwalten',
					closeIconLabel: 'Alle ablehnen und schließen',
					footer: `
                    <a href="/impressum">Impressum</a>
                    <a href="/datenschutz">Datenschutz</a>
                `
				},
				preferencesModal: {
					title: 'Cookie-Einstellungen verwalten',
					acceptAllBtn: 'Alle akzeptieren',
					acceptNecessaryBtn: 'Alle ablehnen',
					savePreferencesBtn: 'Aktuelle Auswahl übernehmen',
					closeIconLabel: 'Fenster schließen',
					serviceCounterLabel: 'Dienst|Dienste',
					sections: [
						{
							title: 'Ihre Datenschutzoptionen',
							description: `In diesem Bereich können Sie bestimmte Präferenzen zur Verarbeitung Ihrer personenbezogenen Daten festlegen. Sie können Ihre Entscheidungen jederzeit über den bereitgestellten Link im Footer erneut aufrufen und ändern. Um bestimmte Verarbeitungsvorgänge abzulehnen, deaktivieren Sie die jeweiligen Schalter oder klickem Sie auf „Alle ablehnen“ und bestätigen Sie Ihre Auswahl.`
						},
						{
							title: 'Technisch erforderlich',
							description:
								'Diese Cookies sind für die einwandfreie Funktion der Website unbedingt erforderlich und können nicht deaktiviert werden.',
							linkedCategory: 'necessary'
						},
						// {
						// 	title: 'Leistung und Analyse',
						// 	description:
						// 		'Diese Cookies sammeln Informationen darüber, wie Sie unsere Website nutzen. Alle Daten werden anonymisiert und können nicht dazu verwendet werden, Sie zu identifizieren.',
						// 	linkedCategory: 'analytics',
						// 	cookieTable: {
						// 		caption: 'Cookie-Tabelle',
						// 		headers: {
						// 			name: 'Cookie',
						// 			domain: 'Domain',
						// 			desc: 'Beschreibung'
						// 		},
						// 		body: [
						// 			{
						// 				name: '_ga',
						// 				desc: 'Beschreibung 1'
						// 			},
						// 			{
						// 				name: '_gid',
						// 				desc: 'Beschreibung 2'
						// 			}
						// 		]
						// 	}
						// },
						// {
						// 	title: 'Targeting und Werbung',
						// 	description:
						// 		'Diese Cookies werden verwendet, um Werbeanzeigen für dich und deine Interessen relevanter zu machen. Ziel ist es, Anzeigen zu zeigen, die für dich interessant und ansprechend sind, und somit wertvoller für Herausgeber und Werbetreibende.',
						// 	linkedCategory: 'ads'
						// },
						{
							title: 'Weitere Informationen',
							description:
								'Bei Fragen zu unserer Cookie-Richtlinie und Ihren Auswahlmöglichkeiten <a href="/#contact-form">kontaktieren Sie uns bitte</a>.'
						}
					]
				}
			}
		}
	}
};
