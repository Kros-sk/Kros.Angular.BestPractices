# language: sk

Požiadavka: Registrácia užívateľa
  Ako užívateľ
  sa chcem zaregistrovať
  aby som mohol fakturovať

  Pozadie:
    Pokiaľ nie som prihlásený
    A navštívim základnú stránku
    Tak ma aplikácia presmeruje na prihlasovaciu stránku
    Keď kliknem na odkaz vytvoriť nový účet
    Tak som presmerovaný na registračnú stránku

  Scenár: Úspešná registrácia užívateľa, ktorý sa ešte nikdy neregistroval
    Keď vyplním registračné údaje užívateľa, ktorý sa ešte nikdy do systému neregistroval
    A kliknem na tlačidlo vytvoriť účet
    Tak som informovaný o vytvorení účtu

  Scenár: Neúspešná registrácia už existujúceho užívateľa
    Keď vyplním registračné údaje užívateľa, ktorý už v systéme existuje
    A kliknem na tlačidlo vytvoriť účet
    Tak som informovaný, že užívateľ už existuje

  Náčrt Scenáru: Neúspešná registrácia užívateľa, ktorý zadá nesprávne údaje
    Keď nesprávne vyplním registračné údaje "<email>" "<password>" "<confirmPassword>" "<acceptLicenseTerms>"
    A kliknem na tlačidlo vytvoriť účet
    Tak som informovaný, že som nesprávne vyplnil údaje

    Príklady:
      | email                 | password  | confirmPassword   | acceptLicenseTerms    |
      |                       |           |                   |                       |
      | cypresstests@kros.sk  | 1234      |                   |                       |
      | cypresstests@kros.sk  | 12345678  |                   |                       |
      | cypresstests@kros.sk  | 12345678  | 12345678BAD       |                       |
      | cypresstests@kros.sk  | 12345678  | 12345678          |                       |
      | cypresstests@kros.sk  | 12345678  | 12345678          | false                 |
