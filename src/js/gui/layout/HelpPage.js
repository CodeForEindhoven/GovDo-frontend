var HelpContent = [
	{
		title: "Toegang tot planlab",
		content: [
			"Om in te loggen op planlab volg je de volgende stappen.",
			{
				type: "list",
				content: [
					"Ga via link naar de APP; http://planlab.wolkenmachine.nl/#!/  ",
					"Je krijgt het verzoek je emailadres op te geven",
					"Na opgave emailadres ontvang je een link met wachtwoord en ‘magische link’, je kunt beiden gebruiken(met de link kun je meteen door), klik hierop",
					"Je kunt nu in de APP werken",
				]
			}
		]

	}
];

var HelpPage = function(){
	return {
		view: function(vnode){
			return m(".help", [
				m(".help-nav","Planlab Help pagina"),
				m(".help-content",HelpContent.map(function(section){
					return m(".help-section", [
						m(".help-section-title", section.title),
						section.content.map(function(content){
							if(typeof content === 'string'){
								return m(".help-section-text", content);
							}
							else {
								if(content.type === "list"){
									return m("ol.help-section-list",content.content.map(function(listelem, count){
										return m("li.help-section-listelem", listelem);
									}));
								}
							}
						})
					]);
				})),
			]);
		}
	};
};
