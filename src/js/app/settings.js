/*jslint nomen: true */
/*globals define: true */

define([],

function() {
  'use strict';

  var settings = {};

  settings.baseUrl = 'http://localdata-sensors.herokuapp.com/api/v1/';

  settings.delay = 10000; // ms between entries

  settings.api = {
    baseurl: '/api'
  };

  // List of fields we want to select
  settings.fieldsString = 'temperature,light,airquality_raw,sound,humidity,dust';
  settings.fieldsToOmit = ['location', 'airquality', 'uv', 'city', 'timestamp'];

  settings.baseLayer = '//{s}.tiles.mapbox.com/v3/matth.01691638/{z}/{x}/{y}.png'; // LocalData

  settings.geojsonMarkerOptions = {
    radius: 10,
    fillColor: "#f07caa",
    color: "#a21c51",
    weight: 3,
    opacity: 1,
    fillOpacity: 1
  };

  settings.measureLabels = {
    'airquality_raw': {
      name: 'Air quality',
      units: 'mV',
      description: 'Description goes here'
    },
    'dust': {
      name: 'Dust',
      units: 'mVpcs/238mL',
      description: 'Description goes here'
    },
    'humidity': {
      name: 'Humidity',
      units: '%',
      description: 'Description goes here'
    },
    'light': {
      name: 'Light',
      units: 'Lux',
      description: 'Description goes here'
    },
    'sound': {
      name: 'Sound',
      units: 'mV',
      description: 'Description goes here'
    },
    'temperature': {
      name: 'Temp',
      units: 'C',
      description: 'Description goes here'
    },
    'uv': {
      name: 'Uv',
      units: 'mV',
      description: 'Description goes here'
    }
  };

  settings.cities = [{
    properties: {
      name: 'Bangalore',
      color: '#26e3b9'
    },
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [77.594563, 12.971599]
    }
  },{
    properties: {
      name: 'Boston',
      color: '#26e3b9'
    },
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-71.05888, 42.360082]
    }
  },{
    properties: {
      name: 'Geneva',
      color: '#26e3b9'
    },
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [6.142296, 46.198392]
    }
  },{
    properties: {
      name: 'Rio de Janeiro',
      color: '#26e3b9'
    },
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-43.172896, -22.906847]
    }
  },{
    properties: {
      name: 'San Francisco',
      color: '#26e3b9'
    },
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-122.419416, 37.774929]
    }
  },{
    properties: {
      name: 'Shanghai',
      color: '#26e3b9'
    },
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [121.473701, 31.230416]
    }
  },{
    properties: {
      name: 'Singapore',
      color: '#26e3b9'
    },
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [103.819836, 1.352083]
    }
  }];


  settings.sources = [{
  "name": "Firefly",
  "city": "Bangalore",
  "location": [
    77.6259827,
    12.9408029
  ],
  "id": "ci4y3qjzq000603zzg8bdbkde"
},
{
  "name": "Palantir",
  "city": "Bangalore",
  "location": [
    77.5905334,
    12.9127007
  ],
  "id": "ci4xs6uhw000403zz9za2guib"
},
{
  "name": "ChaiLatte",
  "city": "Bangalore",
  "location": [
    77.634695,
    12.973039
  ],
  "id": "ci4wvodwv000d02tcoy0qwsfi"
},
{
  "name": "Geekstorm",
  "city": "Bangalore",
  "location": [
    77.644259,
    12.96145
  ],
  "id": "ci4x8lumr000l02tco6291y1u"
},
{
  "name": "MODseeed",
  "city": "Bangalore",
  "location": [
    77.6027288,
    12.9756103
  ],
  "id": "ci53tm6va0001032pzez19tgz"
},
{
  "name": "Laddoo",
  "city": "Bangalore",
  "location": [
    77.589195,
    12.910474
  ],
  "id": "ci4xvuiqf000503zz1bah2he8"
},
{
  "name": "sycsmlp1",
  "city": "Bangalore",
  "location": [
    77.570326,
    13.013893
  ],
  "id": "ci4zftqww0002032zeskt2yuc"
},
{
  "name": "Claptrap",
  "city": "Bangalore",
  "location": [
    77.6383672,
    12.956511
  ],
  "id": "ci541fl410002032pbifg5o7a"
},
{
  "name": "WRI",
  "city": "Bangalore",
  "location": [
    77.5885708,
    12.9436922
  ],
  "id": "ci4yfgz37000e03zzg1a6o6vy"
},
{
  "name": "openbangalore",
  "city": "Bangalore",
  "location": [
    77.61856,
    13.00438
  ],
  "id": "ci4v3czb7000502s7lnln7ztr"
},
{
  "name": "creatorbot",
  "city": "Bangalore",
  "location": [
    77.551852,
    13.043354
  ],
  "id": "ci4z5dc2a0000032zfasduiyb"
},
{
  "name": "BGAOACanvas",
  "city": "Bangalore",
  "location": [
    77.5789318,
    12.8864971
  ],
  "id": "ci4zpx5vv0003032zbu2m6erx"
},
{
  "name": "DataBrigade",
  "city": "Bangalore",
  "location": [
    77.5789318,
    12.8864971
  ],
  "id": "ci4yae86r000903zzsna9zh30"
},
{
  "name": "Hesgar",
  "city": "Boston",
  "location": [
    -71.144965,
    42.339901
  ],
  "id": "ci4q6h7dw000202t98p48w6z4"
},
// {
//   "name": "firehazard",
//   "city": "Boston",
//   "location": [
//     -0.127625,
//     51.503363
//   ],
//   "id": "ci530o426000003v9a6uxvc2l"
// },
{
  "name": "Pineapple",
  "city": "Boston",
  "location": [
    -71.096945,
    42.3895
  ],
  "id": "ci4ooqbyw0001021o7p4qiedw"
},
{
  "name": "theperch",
  "city": "Boston",
  "location": [
    -71.089624,
    42.3443141
  ],
  "id": "ci4qaiat7000002wdidwagmmb"
},
{
  "name": "Sproutuino",
  "city": "Boston",
  "location": [
    -71.097605,
    42.382972
  ],
  "id": "ci4xird28000003zzz1soh9fj"
},
{
  "name": "Richard",
  "city": "Boston",
  "location": [
    -71.105266,
    42.33115
  ],
  "id": "ci4vv79v9000k02s7n4avp69i"
},
{
  "name": "soldering defect",
  "city": "Boston / Cambridge",
  "location": [
    42.36502,
    -71.096538
  ],
  "id": "ci4x0rtb9000h02tcfa5qov33"
},
{
  "name": "Home1",
  "city": "Boston",
  "location": [
    -71.1196326,
    42.3900055
  ],
  "id": "ci4rb6392000102wddchkqctq"
},
{
  "name": "Sir Joseph Dullard",
  "city": "Boston",
  "location": [
    -71.107039,
    42.370755
  ],
  "id": "ci4w3emre000002tcnpko08o3"
},
{
  "name": "monalisa",
  "city": "Boston",
  "location": [
    -71.106167,
    42.372802
  ],
  "id": "ci4ue1845000102w7ni64j7pl"
},
{
  "name": "SeeedSensor",
  "city": "Boston",
  "location": [
    -71.119359,
    42.390486
  ],
  "id": "ci4w1npi3000p02s7a43zws7q"
},
{
  "name": "badgersense",
  "city": "Boston",
  "location": [
    -71.110054,
    42.376184
  ],
  "id": "ci4vzm23c000o02s76ezwdgxe"
},
{
  "name": "Sparkling",
  "city": "Boston",
  "location": [
    -71.109645,
    42.372527
  ],
  "id": "ci4x1uh3q000j02tcnehaazvw"
},
{
  "name": null,
  "city": "Geneva",
  "location": [
    6.156988953133464,
    46.20343253312591
  ],
  "id": "ci4lr75wi000e02yp5ek72zcr"
},
{
  "name": null,
  "city": "Geneva",
  "location": [
    6.1619939,
    46.1972488
  ],
  "id": "ci4lr75o6000002yp6eolj0rm"
},
{
  "name": null,
  "city": "Geneva",
  "location": [
    6.211192,
    46.246715
  ],
  "id": "ci4lr75v6000a02ypa256zigk"
},
{
  "name": null,
  "city": "Geneva",
  "location": [
    6.145645,
    46.19095
  ],
  "id": "ci4lr75ob000102yphtjj75f5"
},
{
  "name": null,
  "city": "Geneva",
  "location": [
    6.13995,
    46.220411
  ],
  "id": "ci4lr75vd000b02ypdlm6qbly"
},
{
  "name": null,
  "city": "Geneva",
  "location": [
    6.116039,
    46.189268
  ],
  "id": "ci4lr75sm000902ypns4q30xy"
},
{
  "name": null,
  "city": "Geneva",
  "location": [
    46.234563,
    6.054929
  ],
  "id": "ci4lr75ve000c02ypnfy0qt8n"
},
{
  "name": null,
  "city": "Geneva",
  "location": [
    6.1668213,
    46.1927629
  ],
  "id": "ci4lr75sl000802ypo4qrcjda"
},
{
  "name": null,
  "city": "Geneva",
  "location": [
    6.1414264,
    46.2154212
  ],
  "id": "ci4lr75oi000202ypmtgrudhs"
},
{
  "name": null,
  "city": "Geneva",
  "location": [
    6.149906,
    46.212852
  ],
  "id": "ci4lr75se000502ypjgleg6kj"
},
{
  "name": null,
  "city": "Geneva",
  "location": [
    6.1401,
    46.174962
  ],
  "id": "ci4lr75ok000302yp9dowz3rm"
},
{
  "name": null,
  "city": "Geneva",
  "location": [
    6.035054,
    46.1558904
  ],
  "id": "ci4lr75sf000602ypyfkxnua3"
},
{
  "name": "PadulaNiteroiRJ",
  "city": "Rio de Janeiro",
  "location": [
    -43.1281207,
    -22.8994585
  ],
  "id": "ci4vye225000n02s7rxjdfxa1"
},
{
  "name": "Olabi",
  "city": "Rio de Janeiro",
  "location": [
    -43.187984,
    -22.947361
  ],
  "id": "ci4x6nzle000k02tckylmop2g"
},
{
  "name": "OurHomeMakerSpace DataCanvas@Rio",
  "city": "Rio de Janeiro",
  "location": [
    -43.2174938,
    -22.964142
  ],
  "id": "ci4sn1zfb000102wetn54eux9"
},
{
  "name": "Cavalo",
  "city": "Rio de Janeiro",
  "location": [
    -43.244374,
    -22.927468
  ],
  "id": "ci50huz75000003whywxrn4wx"
},
{
  "name": "GaveaDataCanvas",
  "city": "Rio de Janeiro",
  "location": [
    -43.234095,
    -22.980901
  ],
  "id": "ci4wsj9if000c02tcrquen3bl"
},
{
  "name": "swissnexbrazil",
  "city": "Rio de Janeiro",
  "location": [
    -43.178667,
    -22.919665
  ],
  "id": "ci4oethyi000302ymejc2wc2j"
},
{
  "name": "Kennyduino",
  "city": "Rio de Janeiro",
  "location": [
    -43.2632354,
    -22.8427674
  ],
  "id": "ci4xkmrkk000103zzm94zdsu4"
},
{
  "name": "BarraDaTijucaCanvas",
  "city": "Rio de Janeiro",
  "location": [
    -43.337678,
    -23.002739
  ],
  "id": "ci4q0adco000002t9qu491siy"
},
{
  "name": "Rio40",
  "city": "Rio de Janeiro",
  "location": [
    -43.1833012,
    -22.9135667
  ],
  "id": "ci4vjer3i000e02s7r2cj23gs"
},
{
  "name": "BarmaCanvas",
  "city": "Rio de Janeiro",
  "location": [
    -43.1620437,
    -22.9443154
  ],
  "id": "ci4symwpg000402wejp5hagiv"
},
{
  "name": "nico",
  "city": "Rio de Janeiro",
  "location": [
    -43.198756,
    -22.956237
  ],
  "id": "ci4q2f9cr000102t9di6kx27u"
},
{
  "name": "Crisp Cookie",
  "city": "Rio de Janeiro",
  "location": [
    -43.2401755,
    -22.9273149
  ],
  "id": "ci4vxorfp000l02s7nv4mlefu"
},
{
  "name": "valeriab",
  "city": "Rio de Janeiro",
  "location": [
    -43.338334499999995,
    -22.9431045
  ],
  "id": "ci4yf41wg000b03zz1sg9c2yb"
},
{
  "name": "chateaubebo",
  "city": "San Francisco",
  "location": [
    -122.448192,
    37.767103
  ],
  "id": "ci54gryz30003032pmcjifsqi"
},
{
  "name": "a-streetcar-named-data-sensor",
  "city": "San Francisco",
  "location": [
    -122.42,
    37.7648
  ],
  "id": "ci4usss1t000102s7hkg0rpqg"
},
{
  "name": "DataDonut",
  "city": "San Francisco",
  "location": [
    -122.403045,
    37.804427
  ],
  "id": "ci4yf50s5000c03zzt4h2tnsq"
},
{
  "name": "ClimateNinja9000",
  "city": "San Francisco",
  "location": [
    -122.402767,
    37.791326
  ],
  "id": "ci4yyrdqi000j03zz8ylornqd"
},
{
  "name": "mapsense",
  "city": "San Francisco",
  "location": [
    -122.41102930000001,
    37.7874046
  ],
  "id": "ci4usvryz000202s7llxjafaf"
},
{
  "name": "Exploratorium",
  "city": "San Francisco",
  "location": [
    -122.396751,
    37.802468
  ],
  "id": "ci4vy1tfy000m02s7v29jkkx4"
},
{
  "name": null,
  "city": "San Francisco",
  "location": [
    -122.40326249999998,
    37.7962173
  ],
  "id": "ci4lnqzte000002xpokc9d25v"
},
{
  "name": "GehlData",
  "city": "San Francisco",
  "location": [
    -122.415348,
    37.758871
  ],
  "id": "ci4xcxxgc000n02tci92gpvi6"
},
{
  "name": "GlenParklifeLogger",
  "city": "San Francisco",
  "location": [
    -122.428851,
    37.73914
  ],
  "id": "ci4yhy9yy000f03zznho5nm7c"
},
{
  "name": "Grand Theater",
  "city": "San Francisco",
  "location": [
    -122.230081,
    37.790237
  ],
  "id": "ci4usvy81000302s7whpk8qlp"
},
{
  "name": "AlleyCat",
  "city": "San Francisco",
  "location": [
    -122.413649,
    37.775641
  ],
  "id": "ci4tmxpz8000002w7au38un50"
},
{
  "name": "grapealope",
  "city": "San Francisco",
  "location": [
    -122.423758,
    37.747894
  ],
  "id": "ci4ut5zu5000402s7g6nihdn0"
},
{
  "name": "Urban Launchpad",
  "city": "San Francisco",
  "location": [
    -122.430467,
    37.767358
  ],
  "id": "ci4yfbbdb000d03zzoq8kjdl0"
},
// {
//   "name": "Boxtroll",
//   "city": "San Francisco",
//   "location": [
//     -0.127625,
//     51.503363
//   ],
//   "id": "ci51oxznm00000347ar9rv1ii"
// },
{
  "name": "chinotto",
  "city": "Shanghai",
  "location": [
    121.4580891,
    31.2353115
  ],
  "id": "ci4yd6rfl000a03zzycxw5inl"
},
{
  "name": "xinchejian",
  "city": "Shanghai",
  "location": [
    121.448771,
    31.225905
  ],
  "id": "ci521nmr600020347n4s107yh"
},
{
  "name": "transistor",
  "city": "Shanghai",
  "location": [
    121.493988,
    31.210459
  ],
  "id": "ci4xrkkxy000203zz2qz5x2qt"
},
{
  "name": "fraserxu",
  "city": "Shanghai",
  "location": [
    121.435432,
    31.226463
  ],
  "id": "ci4s0caqw000002wey2s695ph"
},
{
  "name": "penguin",
  "city": "Shanghai",
  "location": [
    121.441373,
    31.028852
  ],
  "id": "ci4vk908n000h02s7pqy6aud3"
},
{
  "name": "frogsh",
  "city": "Shanghai",
  "location": [
    121.443609,
    31.233924
  ],
  "id": "ci4wmzegn000702tcc6dn993o"
},
{
  "name": "JiadingSensor",
  "city": "Shanghai",
  "location": [
    121.2513265,
    31.3262905
  ],
  "id": "ci4yvawmy000h03zzk5devhpo"
},
{
  "name": "JiadingSensor",
  "city": "Shanghai",
  "location": [
    121.2513265,
    31.3262905
  ],
  "id": "ci4z8a9d10001032zk4mh5qow"
},
{
  "name": "WGQ",
  "city": "Shanghai",
  "location": [
    121.6289675,
    31.2984302
  ],
  "id": "ci4w9izto000302tcgj9hmy9m"
},
{
  "name": "Simon's All Knowing Box",
  "city": "Shanghai",
  "location": [
    121.435574,
    31.203442
  ],
  "id": "ci525hppb00030347n3qo265c"
},
{
  "name": "SASPudong",
  "city": "Shanghai",
  "location": [
    121.7588735,
    31.2327278
  ],
  "id": "ci4xdbcwd000o02tcoi729rb7"
},
{
  "name": "killingjackysbox",
  "city": "San Francisco",
  "location": [
    -122.230081,
    37.790237
  ],
  "id": "ci53h7ry60000032pfrgyjdug"
},
{
  "name": "reversehaven",
  "city": "Singapore",
  "location": [
    103.749155,
    1.396564
  ],
  "id": "ci516u6u8000203wht0ml6o9c"
},
{
  "name": "HPSG730864",
  "city": "Singapore",
  "location": [
    103.794999,
    1.440834
  ],
  "id": "ci4w8gd6f000102tcnp415mz5"
},
{
  "name": "The ThunderBolt",
  "city": "Singapore",
  "location": [
    103.912091,
    1.328281
  ],
  "id": "ci4y4ohu3000703zzy0fxkd5n"
},
{
  "name": "mm@alexandra",
  "city": "Singapore",
  "location": [
    103.803632,
    1.288705
  ],
  "id": "ci4wq5cf6000a02tci6u38edj"
},
{
  "name": "NorthStarOne",
  "city": "Singapore",
  "location": [
    103.798312,
    1.438973
  ],
  "id": "ci4vejnju000b02s70yzzonp9"
},
{
  "name": "sg_hougang_61",
  "city": "Singapore",
  "location": [
    103.88545,
    1.375776
  ],
  "id": "ci4v67rh8000902s7vcxxq6wt"
},
{
  "name": "ghimmohyandao",
  "city": "Singapore",
  "location": [
    103.784951,
    1.308855
  ],
  "id": "ci4wyckhv000f02tcyojovuvr"
},
{
  "name": "HackerspaceSGSeeed",
  "city": "Singapore",
  "location": [
    103.862409,
    1.31042
  ],
  "id": "ci4y9ght2000803zzrj61j1nl"
},
{
  "name": "rpbaltazar@bukit-timah",
  "city": "Singapore",
  "location": [
    103.812228,
    1.326082
  ],
  "id": "ci4v5wwl4000702s7t1u7rz4a"
},
{
  "name": "swissnexSG",
  "city": "Singapore",
  "location": [
    103.792581,
    1.302858
  ],
  "id": "ci4wg4xti000502tccs34dvk4"
},
{
  "name": "SECSensor",
  "city": "Singapore",
  "location": [
    103.737863,
    1.335005
  ],
  "id": "ci4v5vrcu000602s7g2cur4b2"
}
];



  return settings;
});
