import fetch from 'isomorphic-fetch'

export const SELECT_LOCATION = 'SELECT_LOCATION'
export const REQUEST_PLACES = 'REQUEST_PLACES'
export const RECEIVE_PLACES = 'RECEIVE_PLACES'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const RECEIVE_LOGIN_STATUS = 'RECEIVE_LOGIN_STATUS'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const RECEIVE_LOGOUT_STATUS = 'RECEIVE_LOGOUT_STATUS'

export function selectLocation(location) {
  return {
    type: SELECT_LOCATION,
    location
  }
}

function requestPlaces(location) {
  return {
    type: REQUEST_PLACES,
    location
  }
}

function receivePlaces(location, json) {
  console.log(json);
  return {
    type: RECEIVE_PLACES,
    location,
    items: json.results,
    receivedAt: Date.now()
  }
}

export function fetchPlaces(location) {
  return function (dispatch) {
    dispatch(requestPlaces(location));
    //REMOVE 2 lines below after integrating with proper API
    dispatch(receivePlaces(location, dummy_places));
    return;
    return fetch("INSERT_API_URL")
      .then(response => response.json())
      .then(json =>
        dispatch(receivePlaces(location, json))
      )
  }
}

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
}

function receiveLogin(json) {
  return {
    type: RECEIVE_LOGIN_STATUS,
    isFetching: false,
    isAuthenticated: json.isAuthenticated,
    user: json.userId
  }
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout(json) {
  return {
    type: RECEIVE_LOGOUT_STATUS,
    isFetching: false,
    isAuthenticated: json.isAuthenticated,
    user: json.user
  }
}

export function logout() {
  return function (dispatch) {
    dispatch(requestLogout());
    return fetch("/api/logout", {credentials: 'same-origin'})
      .then(response => response.json())
      .then(json =>
        dispatch(receiveLogout(json))
      )
  }
}

export function isLoggedIn() {
  return function (dispatch) {
    dispatch(requestLogin());
    return fetch("/api/isLoggedIn", {credentials: 'same-origin'})
      .then(response => response.json())
      .then(json =>
        dispatch(receiveLogin(json))
      )
  }
}

const dummy_places = {
   "html_attributions" : [],
   "next_page_token" : "CuQB4AAAAMmT6i-MB3oSQSYYvblLk8Okcm6Ok3Lik5vmGZbQFeDmZHRcs_nYM1_pq1l_MSrDINU-_ZFDDWnHB1_SibzD514sJrizEOK25cj_s6maQeK-qLAUFNR1zUAZPWQ5kctMrIqNGfYmldAnxIvTdiVwkJKqXpYpOr9LpkEm9JWZS1i_UFyLNYcKDCsKAYlYZ7Iwh_q-6h_sgjbtRSoeyuhw0cHs8o26abeas8kt-1eWlYrfFBaKRCnZet8eOuMgIjZTTUGBY2jifttxZPtS0vW-DEz5w3Bh1yQg3qkrPNgu5ydDEhCe_g-gbMa6-yWHyNNhCtkZGhQd3t50t8aqK-NweqWHSIuDMn4Uuw",
   "results" : [
      {
         "formatted_address" : "Estrada Miracema Flores, s/n - Centro, Miracema - RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.4075657,
               "lng" : -42.1855258
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "f6670833e9eb3c0adef0151ca8042e0e2becaae2",
         "name" : "Oasis Bar e Restaurante",
         "opening_hours" : {
            "exceptional_date" : [],
            "open_now" : false,
            "weekday_text" : []
         },
         "photos" : [
            {
               "height" : 2448,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/117657099621462025691/photos\"\u003ejrfuzileiro\u003c/a\u003e"
               ],
               "photo_reference" : "CoQBdwAAAFDRzagXXHegr-MCXk0vEbasuRUqye1yRPVgEtes70h7X8cCWxaLNy5F8CJqlOg1Z45XMKvygtjRv91h1X188z3ipXj_TCcw_5Y3rRVogibOgfDG1rLbzPVDEifkl1_PHgXDCtjYEedMv2jaHeTdWUQC-PX0Uq00l_t6ruDTb_HqEhBdUTDJwx8u_0GkoeKitQdjGhQUn8H2ilgrMYiPs0oKoFoxflpYGQ",
               "width" : 3264
            }
         ],
         "place_id" : "ChIJyxjOyLThvAARvixREKqoZXA",
         "rating" : 4,
         "reference" : "CmRRAAAAzYjQz8FD4RApmgC11ldxPz5Of5XrsvB8XX3mK84RaluQA_csPKMgmDzFSyqoAPo6bwlOMvHJel4kcGd2z7BaEAHBN0pdyiIfD8SgSdOjiZDxleY9Xc3W9fGVTdEO9wlKEhBgfPQZBuNEWCjJTYh5_ftGGhR7ejuJE7Xy2nAgpnrDmCjVhT9MJg",
         "types" : [ "restaurant", "bar", "food", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "Praça do Mercado, 22 - Centro - Miracema, RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.41501199999999,
               "lng" : -42.1998788
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.41493539999999,
                  "lng" : -42.1997933
               },
               "southwest" : {
                  "lat" : -21.4152418,
                  "lng" : -42.19994209999999
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "e63f54577ba43ee043d13693fa1fd7adf30d5a64",
         "name" : "Bar da Maria",
         "opening_hours" : {
            "exceptional_date" : [],
            "open_now" : false,
            "weekday_text" : []
         },
         "photos" : [
            {
               "height" : 2448,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/109518273526841041042/photos\"\u003eArmando Ferreira Júnior\u003c/a\u003e"
               ],
               "photo_reference" : "CoQBdwAAAFD4axC0IykCDOwzz4-wirRBKRZi7gP8uyN5oArOqTaAHnvrkFg5UAIoFnNmamrGyhjPMZ2imP_jfIz_A9R0RxAjXb8Z6R4NHuEVGAZ_nODIYk8uq2-KQpLY7ItjolZkt29uudGgomTdM_CNHKMT2mv0zqD5BvXAGe1bioHu1NytEhAhK7Hykz5IDku_5xfQn5R0GhRzPnM-CnqWm8nBZPHEK1LAYu9pTg",
               "width" : 3264
            }
         ],
         "place_id" : "ChIJR3_Ej0rgvAAROIO2sHjR6qk",
         "rating" : 4.3,
         "reference" : "CmRSAAAAmrXEdpYZuiUh6eiOXIid--_5_D9QaeKI5FkuYoQY4W8siJI37_45bZEA_LwU6o-NEMSF2zUEQRndYcHJa88xBHasc9a8UnIbVI9Hi2bdy11AQgUBJS1Qe5KRPwefUEOaEhA6VMR71eVzRXqfDJtGj39GGhSLNNBYTtqVy5jw5mCYAyG-Mhxppw",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "Avenida Nilo Peçanha, 40 - Centro - Miracema, RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.4167839,
               "lng" : -42.1990613
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.41647,
                  "lng" : -42.1987464
               },
               "southwest" : {
                  "lat" : -21.4177256,
                  "lng" : -42.20000599999999
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "0a837c0b0e1d4894033c63b9f3b9d2d6a037b484",
         "name" : "Tio Nilo Bar e Restaurante",
         "opening_hours" : {
            "exceptional_date" : [],
            "open_now" : false,
            "weekday_text" : []
         },
         "photos" : [
            {
               "height" : 2576,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/102590815747139194479/photos\"\u003eWesley André\u003c/a\u003e"
               ],
               "photo_reference" : "CoQBdwAAAKtlJTKEvXIW45whNd8ag7xtx2WnwoV_muJOV8LorUT3afn2KTVrvkQuv7qL4MKulZ_Fr7Jz38ryFJZ5N8m7h1OBf4g2dFigQRSZofyhDQBg4Vke5mdksbl_A8oU-aH1q4qJZwMrDrPt-608V9E8dxh--v3EJHExKrFI-38Md9j3EhBbcgR-WIeoAE7GxNnkAnd4GhTvGYH4-5SjiZ4n3BK_WobcU2ZQuw",
               "width" : 1932
            }
         ],
         "place_id" : "ChIJoTQUaDXgvAARt1GqU4gVoqY",
         "rating" : 4.4,
         "reference" : "CmRSAAAA1Gffhrr-869xl8Srcb1ClUIsN3a8U7xLPx1tQOaCBKD16aQ6AfeTltCYJmSXWRgF4t8eESp2Gj0BYFPnrIWHk0kBqlnPkgH7VWxDsklmsvRZ2ufHKGOauAxgKWzaZz27EhDQDe_EH7smA-HOl0IWesRsGhSWzeVVjd0o2GLFHYyYHaZS3SBK9Q",
         "types" : [ "restaurant", "bar", "food", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "Rua Coronel Pedro Bastos, 856 -Miracema - RJ, 28466-000 - Venda das Flores, Miracema - RJ, 28466-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.3348407,
               "lng" : -42.1380765
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.33472515,
                  "lng" : -42.13790914999999
               },
               "southwest" : {
                  "lat" : -21.33518735,
                  "lng" : -42.13857855000001
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "5ebe7ce2d58c05051b1b3482e7482f82397ffcb1",
         "name" : "Bar do Carlinhos",
         "opening_hours" : {
            "exceptional_date" : [],
            "open_now" : false,
            "weekday_text" : []
         },
         "photos" : [
            {
               "height" : 596,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/115108260462035633574/photos\"\u003eBar do Carlinhos\u003c/a\u003e"
               ],
               "photo_reference" : "CoQBdwAAACdwBn0xetYMAbX28niyif-pn17YHzSFKyBfGlLNeTrmEE1Kqltx7fh5j8ibsASRwPpEVC4LzvEBn_vjXZAKZPIl9I6ixALi5i6_AhX6gYFELXvCXq-0L7oQPGhjk35IG0i9OPs69jhxFFuiuZdnBWYgIcekMfE8PFWrnPfcDVYHEhDKDw_b4DG4aVPrF-zZS4_WGhT9HYjWnCGdULczImEUoQaW1r_STA",
               "width" : 596
            }
         ],
         "place_id" : "ChIJDdOj7snlvAARjwPyqizQmeQ",
         "reference" : "CmRSAAAAxzfkMB5EKkWLHV3ZEQjk7fxfxVIxtgZ255H0eibaV3yareruerK4HoKwj-X0a2jjykO4gnn8ltt2QQGLSoNcecbI7QLji2599KGxg0i_WdlaK_DwXycrA9M26fc4ga7hEhB6-ybHv7p5wdWKCdQ8MBYTGhTMd6kjdjIwDHAK4MZUKzT5x-KlZA",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "Av. Dep. Luís Fernando Linhares, 114 - Centro, Miracema - RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.4071206,
               "lng" : -42.18572289999999
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.4069213,
                  "lng" : -42.18567334999999
               },
               "southwest" : {
                  "lat" : -21.4077185,
                  "lng" : -42.18587154999999
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "e7aa972d2ef18788e509fb6964cbc161cefff9cd",
         "name" : "Sebastião da S Mota Bar",
         "place_id" : "ChIJ5y4XsqjhvAARUvVvscqwP4Q",
         "reference" : "CmRSAAAAX6FGIKxObPahN5lZomyCJp90pJO5Z0UXv8CQo5vP5dt-H3DXIdosdxjfqFBr37-leAaXhX1YLU_BYBbak_1mDPud5skgnPaItsbigOYLiJz-Ky6MwyS4MDlbZiqLvlEnEhCup0lCqmoDXZC31YzXtMMuGhSGneCJHC2gIBtmUICLhuCCZ3o4JA",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "R. Elpídio Portes Mendes, 367 - Morro do Demétrio, Miracema - RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.4109653,
               "lng" : -42.2006716
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.41096215,
                  "lng" : -42.20053254999999
               },
               "southwest" : {
                  "lat" : -21.41096634999999,
                  "lng" : -42.20071795
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "70a34ac2cbcd3b4c3e04fc1713129f4879efd537",
         "name" : "Bar N. S. Aparecida.",
         "place_id" : "ChIJWYonNEzgvAARzzaeh7LNrb8",
         "reference" : "CmRSAAAA3SpbRrU7JOq0pbVqAOoH2WJIU9uctbo6PRurDqwxDMrj44qJRECyULQSYISh_xuUcRPxc6Z2zEj10Lh8tfJSBRpawuR5t0SjyN6LyatArvVzEZ-pJ_F93NwhSTLhvNshEhASzZNvicgq0N5FBNxnvLw_GhRBJiULErt4LgN7zUnBDkEEqXSrdQ",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "State of Rio de Janeiro, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.457499,
               "lng" : -42.1971016
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "f621c619b109f6836bc2c1e12f7389f52546d3cb",
         "name" : "Piscinão Esperança (Bar da Dalva)",
         "opening_hours" : {
            "exceptional_date" : [],
            "open_now" : false,
            "weekday_text" : []
         },
         "photos" : [
            {
               "height" : 2448,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/103816225307431118535/photos\"\u003eRenato Barros\u003c/a\u003e"
               ],
               "photo_reference" : "CoQBdwAAAMSvOnaq9xnZh6V-cww800U3dpRqIu5LDtXQzFOt2nbBw20J1KiLZCqAHsT-IICKYhu-O-jzj43k_Ql4NjlYC9Lf4rmvQR72aXkmIc_VwG71nh__wMVsXKZWJDjxrlhyWfFPEaVOKA-syfPArKoPrlwJ9m3RmjBF4oGcJT0KFDTNEhCjn-Gl2bYFmC5NDByotPMZGhRupKktuBZa4H0X4hpZ03Z221npzQ",
               "width" : 3264
            }
         ],
         "place_id" : "ChIJT937qcofvQAR3q-XlSSZN7Q",
         "rating" : 5,
         "reference" : "CmRSAAAAhzD_hlLWuxc9PA1bUPXVdrbxImysRlM3GUFZdgoEb5tjgfWn1WBEbRvycOQ6ELyRcnwnAL13AprDYuS_orL1B6CKC5XSDwzRYWT2sy_hSHz2OhI4nLZt8D83X0MLSEYEEhCvJ_ahzgUhydbse7NsXed-GhQnzLAb8szRjFDGbH4j8GVMx9uAeA",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "R. Gov. Roberto Silveira, 919 - Morro do Demétrio, Miracema - RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.403265,
               "lng" : -42.1867772
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.4032467,
                  "lng" : -42.18669424999999
               },
               "southwest" : {
                  "lat" : -21.4033183,
                  "lng" : -42.18680565000002
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "6e4b4b0297fae1a22f6e65b3133b7243c0ad35ce",
         "name" : "Bar Sentineli",
         "place_id" : "ChIJ18PI_afhvAARwkyM1GQt460",
         "reference" : "CmRSAAAAR1fWPVv3kCnyv0IDqHQAfB_JAh1kQSrcONMSQzVQE-SJw2-nU1iqKx6iwl3pUIuFaGWcdQ6nRWMWQR9P-psPnisb9NFmDBAPS6x-W361M-EfqQSQXmv4SmUl0m7nkZ35EhA2cswhKmbr8Th2pV-j5F4IGhROVoER6xGhQDOMBThYrAg4gZ8cPA",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "R. Mal. Floriano Peixoto, 446 - Miracema, RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.4159345,
               "lng" : -42.2006266
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.41589995,
                  "lng" : -42.20062355
               },
               "southwest" : {
                  "lat" : -21.41602575,
                  "lng" : -42.20062775
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "4459e17628314bd3864c2077eb142c9b064b6251",
         "name" : "Bar Do Chico",
         "place_id" : "ChIJH4ZVNkrgvAAR4qJVoAvxsKA",
         "reference" : "CmRSAAAACAyKkdf_gj9-jkwwsDrH4B9M9bUu0LedpA-eDAYlKdzIVaCeeL7qjohmNMUplYDVRNe71hx5bYvejuYlOSmP9x5IcLqRJ2uslMijDtnYNAU32ougDGHm2oGpZSxsJoSOEhA5xQWdeDnfaGv2sZqZHXNlGhQpnuYmKsc7P09Juyu-RCMY2sRL-w",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "Tv. do Engenho, 362, Miracema - RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.4328488,
               "lng" : -42.1018445
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.4327884,
                  "lng" : -42.101831
               },
               "southwest" : {
                  "lat" : -21.4329116,
                  "lng" : -42.10185859999999
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "78fa47957b15bbdc16b90b92022c3709901ae365",
         "name" : "Bar e mercearia Pais e Filhas",
         "opening_hours" : {
            "exceptional_date" : [],
            "open_now" : false,
            "weekday_text" : []
         },
         "place_id" : "ChIJh3McQeHivAAR66MVl_u_-5w",
         "rating" : 5,
         "reference" : "CmRSAAAAZXkvkieJs1AbvOfiRz3c3E9rwJc8Fkkchnlh6JWo9mH2QzVkhj_qarL2g_ct6MePKhPg-DdrFH7xyw1S9iy4bdqmddySihN7_04nSwo6xNatT-wq31top-Z4L8WmGIvqEhAN96EX4g5rkX6e-OO3DvDgGhSSDIZX6fJ0fbpj3ftnpjPYFPk-lA",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "Av. Carvalho, 1179 - Santa Tereza, Miracema - RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.4037641,
               "lng" : -42.1853766
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.40372725,
                  "lng" : -42.18533040000001
               },
               "southwest" : {
                  "lat" : -21.40378745,
                  "lng" : -42.18544919999999
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "42734f8f2fa440fb0127ea3d1c69fc739144daa4",
         "name" : "Bar Do Ori",
         "opening_hours" : {
            "exceptional_date" : [],
            "open_now" : false,
            "weekday_text" : []
         },
         "photos" : [
            {
               "height" : 1456,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/108737318786667781153/photos\"\u003eJc Hpd\u003c/a\u003e"
               ],
               "photo_reference" : "CoQBdwAAAJZWFJPYN0NtABgTSIb2XQ6OiOTlBo9ICMvcsUpSWmer7KS-_-rJEWHFkfNMDNVpCc8qRtPLIpTJLFXArC4RskJfJA89YSbNpXvUQvei3xY8jHwfdW24crIAwwMdzqiYc9CQ8ECd8rf3a4yerzvGc9e4TKC2l5r45rU5eg6-POzMEhDCZCXwpJz1wnc9bYURNpotGhQG9bM4-nj9vVq1XIzC2ybldMN-Uw",
               "width" : 2592
            }
         ],
         "place_id" : "ChIJ-bMujKfhvAARSW5m2ZWhLk4",
         "reference" : "CmRRAAAA-rx2VjqJAUX7eG--YsX13vQSAjuQqAulVJgwrVzH9XdvBFiAQxbqZogiLqdgh5r2PT2el-YVnep84pFq91q_d5eoEBRNA6WsQtXJqzwxbyb-HssSEimBs1-qwm_I6nXYEhBFl6fS1ffID0VZ3UBx5O_gGhRryFtn9z0V6q-wJCkTBIyrlfS1og",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "281 - R. Odilon Botelho, 199 - Morro do Demétrio, Miracema - RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.4069507,
               "lng" : -42.2019098
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.40691140000001,
                  "lng" : -42.2018537
               },
               "southwest" : {
                  "lat" : -21.40698699999999,
                  "lng" : -42.20196169999999
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "a1bc8ef9cce349d675b3f6dd8f5f3ea66e1cfad0",
         "name" : "Bar Da Alaíde",
         "opening_hours" : {
            "exceptional_date" : [],
            "open_now" : true,
            "weekday_text" : []
         },
         "place_id" : "ChIJozIk9FHgvAARJ1n-k-5QpS8",
         "rating" : 4.5,
         "reference" : "CmRRAAAA8Viwszaj8YobFznG3p2IXLAgeeYxizZ3DwXV5mJ-Kc20guifehG6s_4pO_Knnp8J4EiuKjheFs3K0clL0S_IomDHY_DCIs2G5p1qSlhsuQfxfPbnmB3zcG6gRfdwKDIPEhAZXQ2PC0FWSTY3y_WZJaalGhSY9cOq3ew9Q0rMSQ4JRrFr9Fp_NQ",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "bairro pontilhão do rosa - Av. Eiras, 1198 - Vila Ramos, Miracema - RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.4265812,
               "lng" : -42.20514629999999
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.4265181,
                  "lng" : -42.20506095000001
               },
               "southwest" : {
                  "lat" : -21.4266289,
                  "lng" : -42.20517474999998
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "8d7bb51169cfc694a8fb821c040db473f8144189",
         "name" : "Bar Do Evaldo",
         "place_id" : "ChIJDXkxwy_gvAARN6tY5kmbdAs",
         "reference" : "CmRRAAAAUomkQuISO02KcIQWOApCBIM-AqXFOTcvIQyn3owGr96O3ybSwvZn1zI5rpnl5f7lpap1AAQGeNCpffJIoQvoR4LZR1UxLarQ4YcGD6MKNbL5C5s3FRUlzI5nXDmaD_wYEhBJjgFWHKAUqin2RLmHSkk-GhQun-lfsfJzu8iBmJs30S3OB0VM3g",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "R. Demetildes Maria Linhares, 1 - Morro do Demétrio, Miracema - RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.4066432,
               "lng" : -42.2005812
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.40657855000001,
                  "lng" : -42.20050739999999
               },
               "southwest" : {
                  "lat" : -21.40666475,
                  "lng" : -42.20060580000001
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "610c1024b077806abf69fead27be7cea0ad673f5",
         "name" : "Eergencia Bar",
         "photos" : [
            {
               "height" : 4096,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/114654917380039077501/photos\"\u003ealveone faria\u003c/a\u003e"
               ],
               "photo_reference" : "CoQBdwAAAOPUCdAQYCyd88ngXkhehmeLpYL-PUWUkx1-5wRbN7IWFqgIaKD_wJfpTbh35NuovoXMoOkwOZWQsd_dd5Z8rsBxM9shGPrs3oTFBz6kb7lWm5ajr4raZJ7yjfgPWEqqXk54xj0CKHQFkCtzcUdvSdNJY_llhNZj7c5qODhV5GLaEhCfIdRemj7vX3XTkLiXA2qpGhRRvrCjyJ4DBmpNuyxm2ANUmLWSyg",
               "width" : 3072
            }
         ],
         "place_id" : "ChIJiyL3OFLgvAARZFKVYEeFKAI",
         "rating" : 5,
         "reference" : "CmRRAAAACNEfOMwEz0OPt5LVo1IOnnZ8oa__nSIeXUdM2s3-qQ1aVpRemMTn_lyaPLnVweQESd7l8Pq4MfgHuoiMyY3KU7DIsL4V6CZ9KrOE5cC_Xc9A-H_3rc_KZXaXPCnKTiIiEhBVIRVGAk7cp_nUbcb4N0zMGhSN-YCYCCRMFesCXjGjbvqEXOgH6Q",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "Av. Carvalho, 408-474 - Morro do Demétrio, Miracema - RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.408759,
               "lng" : -42.1904876
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.4086867,
                  "lng" : -42.19046545
               },
               "southwest" : {
                  "lat" : -21.4087843,
                  "lng" : -42.19055084999999
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "d71d70030d2e2d5f88743c309b15f1ebfb0e1121",
         "name" : "Prime Chopp",
         "opening_hours" : {
            "exceptional_date" : [],
            "open_now" : false,
            "weekday_text" : []
         },
         "photos" : [
            {
               "height" : 1200,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/104624966215635524657/photos\"\u003eFlavio Augustus\u003c/a\u003e"
               ],
               "photo_reference" : "CoQBdwAAAH6FlB_2tFXbKYnQD0qsei3r9rfVscjJk-W3ItxCKSexv32gIcuRbCUqOidgyD8d45bsE_0pmC1e9WfKVyOX5Z7CK_ZkA4Oo9rAm98wdfoIdJmY0DcG90WqSq26dk6Btd9loM0i1YI9Y7wEeJiwPt72lV6RP939_gwvmdmQR3UWfEhAIBxkvJEBXdBTyfjedTEAHGhRq3RDOaX-MHzEGl2o5rCDe8tOWTQ",
               "width" : 1600
            }
         ],
         "place_id" : "ChIJ162S9K7hvAARCeGEWaympBM",
         "rating" : 3.5,
         "reference" : "CmRRAAAAOBpQEaUKDvdAhvWugDM46PTCDLzIEWYCn_grxhNljQP8ZylAbKt3lrk7YcZzfQaTzTrG33NmYXHZPRIrwYomNHpltk-taIxvpMh3DxJ0kvuvkWp4sbWXjK-OHnewevJHEhA-hVSlD04-vzyh5rc47it-GhSAVqzbO2udrnYTWf4V6h5gNsjpaA",
         "types" : [ "bar", "restaurant", "food", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "127 - R. P. Nilo, 17 - Morro do Demétrio, Miracema - RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.413808,
               "lng" : -42.195518
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.4137735,
                  "lng" : -42.19520075
               },
               "southwest" : {
                  "lat" : -21.4139115,
                  "lng" : -42.19562375
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "f2faca34f8c48296da5121287410902f771ef7a4",
         "name" : "Le Must Taberna",
         "photos" : [
            {
               "height" : 540,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/108425210832596436573/photos\"\u003eLE MUST Taberna\u003c/a\u003e"
               ],
               "photo_reference" : "CoQBdwAAAHaZC08D0Ew1Ybj_y2d_1SexLHDLHXTw9FYEDI-NHVbL3jIkNZWZlrWsKnUX1si2k_KI_mMIi04MAv4FU9Dcw7ug7U_ru6e5x6guCJrHA733CatWesKUYgbOAhp8xFU1WOycYY1RFFDOcxelbiCyFxLvGh3B_SPXuzr9AGM2eRguEhDuvV2StVYxOqvS6h6Jvx_kGhSOutRBu_x6Zj8pvar7HfPaAeT2Ug",
               "width" : 960
            }
         ],
         "place_id" : "ChIJN3bkabPhvAAR3OdhN7pfIE0",
         "rating" : 4.6,
         "reference" : "CmRRAAAAQ9HOdvqmbm015sIQ6MBZZwk179YfFv2i2wcE_lnR7FFUfllILE9PGP5MIKsYSgTq4VfRjFTloh-arl4-1BcIghEokFukXDpcIH7vxuyZNlW0Co2N4JzLaSKkSZlgvqQSEhCMfqA0At_0tRPc0m8g6Z-bGhTzJR49Lu7g-sPGmbeNHlKIiKzbBw",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "State of Rio de Janeiro, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.4110916,
               "lng" : -42.182174
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "2d81200fb392774a98664dcb642e9b07c99e7654",
         "name" : "Sitio do Mauro",
         "photos" : [
            {
               "height" : 2988,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/112335902508849262319/photos\"\u003eBruno Oliveira\u003c/a\u003e"
               ],
               "photo_reference" : "CoQBdwAAAG19qny-ksZ2nuc-Gp4Ke1Yqm4NKZ9OdbBxhGoixcNaNlCjjHvgPoQ-g0mMisxb8GeWyvBOWDTItmN96Awvo__UPJiqguKkJSxK3bZ_9sbrucwdOF-qr0-qCrwGfgv2_kNKR5kIseBIcEzL0DnR4LkinBPXBr4SzYgnbMXCiZ5f3EhCsJmhbowkWuAy1vhYdCd2pGhSh2gcl-HjIPOQHJ8bR8rHzThSP3Q",
               "width" : 5312
            }
         ],
         "place_id" : "ChIJpUyneaThvAARrXjehL8SrB4",
         "reference" : "CmRRAAAA9LeS5uazmFfvjHBYtkemhS799OYtBEKqgiCGXm0Gc1DDxthf3TJKLHBSY1c12UG8CwxVa1gFpJIBRA7mcDT4XXfeqp-TNiYadPVPVMf7OhKILz7KgVHX7q-1OpmpgajGEhCzvcPUg7oy7hYruUR6QngeGhSTtwukd4iVNR5Ahcnb2piLhSzuPQ",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "Rua Odilon Botelho Cehab, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.4081506,
               "lng" : -42.2018773
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "d727194c340c6cf267ac4ccea15de53589d9b6f3",
         "name" : "WG LANCHES",
         "opening_hours" : {
            "exceptional_date" : [],
            "open_now" : false,
            "weekday_text" : []
         },
         "place_id" : "ChIJt6QoAU7gvAAR6-LQmHxT1IE",
         "rating" : 1,
         "reference" : "CmRSAAAAScd_TmoITcRIRhrtXxTWubhmxNILogu1sxv16nD-3DiP3zHLMVf91qt-xiBEVMo-nAInzbSqt9NqLat1jjiHLzNYRD1OyCRJdymWxtVfOUitvZOeAXiTfd3eh7gE1NnJEhAf0TZ_SGl2egfXbXfgcvFXGhSxzmpCFq6DpT35nlK2dg2f-6JDBA",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "R. Mal. Floriano Peixoto, 6 - Centro, Miracema - RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.4148266,
               "lng" : -42.19743690000001
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.41479715,
                  "lng" : -42.1973703
               },
               "southwest" : {
                  "lat" : -21.41491495,
                  "lng" : -42.1974591
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "714b2514fe32c52e4522f8acd1a70f7d50a1053b",
         "name" : "Bar e Sorveteria Sol de Verao de Miracema",
         "place_id" : "ChIJqQ_sWEvgvAARXoewhasdv3E",
         "rating" : 4.7,
         "reference" : "CmRRAAAAayq3hx8e0Y_IYLAicneyPcBIQHPxQ7VTWDivH_rSZ0O1DocpGkmfCscLflJ0pC_ou2FskwbX2QqK7gmthtb3PY9S9XG5ZmHfXJ5mzAx8MS90D_OdWRzIlWYcoWX4YUUMEhAL-BDjuV8s_ARJBZgwMWnkGhTnCdhoL9ioczJrxZAqyFW9BhsrRA",
         "types" : [ "restaurant", "food", "point_of_interest", "establishment" ]
      },
      {
         "formatted_address" : "R. José Monteiro de Barros - Miracema, RJ, 28460-000, Brazil",
         "geometry" : {
            "location" : {
               "lat" : -21.4094067,
               "lng" : -42.2033117
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -21.40938345,
                  "lng" : -42.20328895
               },
               "southwest" : {
                  "lat" : -21.40947645,
                  "lng" : -42.20337995000001
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "5041eb7cd742edb39fda0c0e6698541c8b28c963",
         "name" : "Cida Salgados",
         "opening_hours" : {
            "exceptional_date" : [],
            "open_now" : true,
            "weekday_text" : []
         },
         "place_id" : "ChIJ22eeW07gvAARtgsu6dY73uk",
         "rating" : 4.2,
         "reference" : "CmRSAAAA8u09ZZh_5Zlbg87H8sWOohbvk1kn8M8F7pWXAsqDYzN9Jf8tavkR6skL5VmpPSV77z0KxwkL2ikZTU6aWUHpjU0PVRrN082eiY_jT81dlhL95WCECnrQX1PSHZ98XdhQEhD_D6ABV7xNN3-tqEtx09TXGhSVp9FgP1A_xQAiX1GBEGl3pFDy2Q",
         "types" : [ "bar", "point_of_interest", "establishment" ]
      }
   ],
   "status" : "OK"
}