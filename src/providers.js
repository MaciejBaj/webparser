const { mobile_de_static_html } = require('./fixtures/static_html.fixtures');

const providers = [
    {
        name: 'mobile.de',
        html: mobile_de_static_html,
        uri:
            'https://suchen.mobile.de/fahrzeuge/details.html?id=281778531&damageUnrepaired=NO_DAMAGE_UNREPAIRED' +
            '&isSearchRequest=true&makeModelVariant1.makeId=25200&pageNumber=1&scopeId=C' +
            '&sfmr=falsev0a66666666666666b06a06b06a6a6f0aaaaaaaaaaaaa0f0aaaaaaaaaaaaaaa00aa06aaaaaaaaaa06aa06aa04aaaaaaaaaaaaa0%20have%20been%20settled',
        schema: {
            // Those will go to the jQuery selector by attributes: $("[id=choose]"
            title: 'id="rbt-ad-title"',
            kategorie: 'id="rbt-category-v"',
            fahrzeugnummer: 'id="rbt-db-sku"',
            anbieter: 'id="dealer-hp-link-bottom"',
        },
    },
];

module.exports = { providers };


/**
 * ToDo: Solve Cookies problem - mobile.de returns access-denied if no cookies present.
 *
 <html>
    <body>
        <h1>Zugriff verweigert / Access denied</h1>
    <pre>
    Leider koennen wir Ihnen an dieser Stelle keinen Zugriff auf unsere Daten gewaehren.
    Sollten Sie weiterhin Interesse an einem Bezug unserer Daten haben, wenden sie sich bitte an:

    Unfortunately, automated access to this page was denied.
    If you are interested in accessing our data, please contact:

    Phone:
    +49 (0) 30 8109 - 601

    Mail:
    datenpartner@team.mobile.de

    mobile.de GmbH
    Marktplatz 1 | 14532 Europarc Dreilinden | Germany

    Geschaeftsfuehrer:
    Malte Krueger
    HRB‑Nr.:
    18517 P, Amtsgericht Potsdam
    Sitz der Gesellschaft:
    Kleinmachnow
    </pre>
    </body>
</html>
 **/
