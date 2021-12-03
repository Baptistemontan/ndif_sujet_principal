export default function About() {
  return (
    <html>
      <header>
        <meta charset="utf-8" />
        <img src="images/about/background_header.png" />
        <link href="styles/about.module.scss" rel="stylesheet" type="text/scss" />
        <h1>
          Nuit de l'info  LesStmgDeLESIEA
        </h1>
      </header>

      <body>
        <img src="images/about/background_body.png" />
        <h2>
          <p>
            Défi principal de l'évènement "La Nuit De L'Info", ce site à été créé afin de pouvoir rechercher des informations sur le site "sauveteurdudunkerquois.fr".
          </p>
          <p>
            Nous avons donc créé une base de donnée regroupant les informations des sauveteurs, des bateaux, et des sauvetages référencés sur le site.Quand une recherche est effectuée, le site recherche les élèments correspondants dans cette base de données, et renvoie un lien vers les différents articles existants.
          </p>
          <p>
            Par exemple, en recherchant le nom de famille d'un sauveteur, vous obtiendrez en résultat tout les sauvetages auxquels il a participé, ainsi que l'article sur ce sauveteur.
          </p>
        </h2>
      </body>
    </html>)
}
