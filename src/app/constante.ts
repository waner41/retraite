 const Constants = {
        PartSalariale: 6.90,
        PartPatronale: 8.55,
        DeplafonneePartSalariale: 1.90,
        DeplafonneePartPatronale: 0.40,
        PSS:3428,
        SMIC:10.15,
        TrimestreReference: [
            { annee:[1952],trimestre:164,ageLegal:60.75,ageTauxPlein:65.75},
            { annee:[1953],trimestre:165,ageLegal:61.17,ageTauxPlein:66.17},
            { annee:[1954],trimestre:165,ageLegal:61.58,ageTauxPlein:66.58},
            { annee:[1955,1956,1957],trimestre:166,ageLegal:62,ageTauxPlein:67 },
            { annee:[1958,1959,1960],trimestre:167,ageLegal:62 ,ageTauxPlein:67},
            { annee:[1961,1962,1963],trimestre:168,ageLegal:62 ,ageTauxPlein:67},
            { annee:[1964,1965,1966],trimestre:169,ageLegal:62 ,ageTauxPlein:67},
            { annee:[1967,1968,1969],trimestre:170,ageLegal:62 ,ageTauxPlein:67},
            { annee:[1970,1971,1972],trimestre:171,ageLegal:62 ,ageTauxPlein:67},
            { annee:[1973],trimestre:172,ageLegal:62,ageTauxPlein:67 }
        ],
        TrimestreHandicap: [
            { annee:[1956,1957],ageDepart:[{age:55,trimestre:106,assur:126},{age:56,trimestre:96,assur:116},{age:57,trimestre:86,assur:106},{age:58,trimestre:76,assur:96},{age:59,trimestre:66,assur:86}]
        },{ annee:[1958,1959,1960],ageDepart:[{age:55,trimestre:107,assur:127},{age:56,trimestre:97,assur:117},{age:57,trimestre:87,assur:107},{age:58,trimestre:77,assur:97},{age:59,trimestre:67,assur:87}]
        },{ annee:[1961,1962,1963],ageDepart:[{age:55,trimestre:108,assur:128},{age:56,trimestre:98,assur:118},{age:57,trimestre:88,assur:108},{age:58,trimestre:78,assur:98},{age:59,trimestre:68,assur:88}]
        }
        ],

        TrimestreLongues: [{annee:[1957],departPossible:[{age:57,trimestre:174,avant:16},{age:59.67,trimestre:166,avant:16},{age:60,trimestre:166,avant:20}]
    }, {annee:[1958],departPossible:[{age:57.25,trimestre:175,avant:16},{age:60,trimestre:167,avant:20}]
    }, {annee:[1959],departPossible:[{age:57.67,trimestre:175,avant:16},{age:60,trimestre:167,avant:20}]
    }, {annee:[1960],departPossible:[{age:58,trimestre:175,avant:16},{age:60,trimestre:167,avant:20}]
    }, {annee:[1961,1962,1963],departPossible:[{age:58,trimestre:176,avant:16},{age:60,trimestre:168,avant:20}]
    }
],
    referencePSS: [{annee:1960,pssAnnuelle:10.43,coef:23.62},
        {annee:1960,pssAnnuelle:1042.75,coef:23.62},
        {annee:1961,pssAnnuelle:1234.84,coef:20.537},
        {annee:1962,pssAnnuelle:1463.51,coef:17.705},
        {annee:1963,pssAnnuelle:1591.56,coef:15.802},
        {annee:1964,pssAnnuelle:1737.91,coef:14.234},
        {annee:1965,pssAnnuelle:1865.97,coef:13.314},
        {annee:1966,pssAnnuelle:1975.73,coef:12.582},
        {annee:1967,pssAnnuelle:2085.50,coef:11.912},
        {annee:1968,pssAnnuelle:2195.26,coef:10.98},
        {annee:1969,pssAnnuelle:2487.968,coef:9.518},
        {annee:1970,pssAnnuelle:2744.0823,coef:8.646},
        {annee:1971,pssAnnuelle:3018.4905,coef:7.756},
        {annee:1972,pssAnnuelle:3347.7804,coef:6.989},
        {annee:1973,pssAnnuelle:3731.9519,coef:6.458},
        {annee:1974,pssAnnuelle:4244.1806,coef:5.694},
        {annee:1975,pssAnnuelle:5030.8176,coef:4.793},
        {annee:1976,pssAnnuelle:5780.8667,coef:4.073},
        {annee:1977,pssAnnuelle:6604.0914,coef:3.513},
        {annee:1978,pssAnnuelle:7317.5528,coef:3.16},
        {annee:1979,pssAnnuelle:8177.3653,coef:2.882},
        {annee:1980,pssAnnuelle:9165.2349,coef:2.534},
        {annee:1981,pssAnnuelle:10482.3944,coef:2.237},
        {annee:1982,pssAnnuelle:12503.8684,coef:1.997},
        {annee:1983,pssAnnuelle:13976.5259,coef:1.884},
        {annee:1984,pssAnnuelle:15183.9221,coef:1.786},
        {annee:1985,pssAnnuelle:16272.4081,coef:1.712},
        {annee:1986,pssAnnuelle:17104.7797,coef:1.673},
        {annee:1987,pssAnnuelle:17809.0942,coef:1.612},
        {annee:1988,pssAnnuelle:18348.7637,coef:1.575},
        {annee:1989,pssAnnuelle:19098.8129,coef:1.519},
        {annee:1990,pssAnnuelle:19976.9192,coef:1.478},
        {annee:1991,pssAnnuelle:21001.3766,coef:1.455},
        {annee:1992,pssAnnuelle:21970.9524,coef:1.408},
        {annee:1993,pssAnnuelle:22839.9118,coef:1.408},
        {annee:1994,pssAnnuelle:23342.9935,coef:1.383},
        {annee:1995,pssAnnuelle:23772.8997,coef:1.367},
        {annee:1996,pssAnnuelle:24577.8306,coef:1.334},
        {annee:1997,pssAnnuelle:25099.2062,coef:1.32},
        {annee:1998,pssAnnuelle:25776.0798,coef:1.305},
        {annee:1999,pssAnnuelle:26471.2474,coef:1.29},
        {annee:2000,pssAnnuelle:26892.0066,coef:1.283},
        {annee:2001,pssAnnuelle:27349.3537,coef:1.258},
        {annee:2002,pssAnnuelle:28224,coef:1.231},
        {annee:2003,pssAnnuelle:29184,coef:1.21},
        {annee:2004,pssAnnuelle:29712,coef:1.191},
        {annee:2005,pssAnnuelle:30192,coef:1.171},
        {annee:2006,pssAnnuelle:31068,coef:1.15},
        {annee:2007,pssAnnuelle:32184,coef:1.131},
        {annee:2008,pssAnnuelle:33276,coef:1.119},
        {annee:2009,pssAnnuelle:34308,coef:1.109},
        {annee:2010,pssAnnuelle:34620,coef:1.099},
        {annee:2011,pssAnnuelle:35352,coef:1.089},
        {annee:2012,pssAnnuelle:36372,coef:1.068},
        {annee:2013,pssAnnuelle:37032,coef:1.047},
        {annee:2014,pssAnnuelle:37548,coef:1.034},
        {annee:2015,pssAnnuelle:38040,coef:1.034},
        {annee:2016,pssAnnuelle:38616,coef:1.033},
        {annee:2017,pssAnnuelle:39228,coef:1.033},
        {annee:2018,pssAnnuelle:39732,coef:1.025},
        {annee:2019,pssAnnuelle:40524,coef:1.01},
        {annee:2020,pssAnnuelle:41136,coef:1}
    ]
    }
export default Constants