import { useLocation } from "react-router-dom"
// import { utcToZonedTime, format } from 'date-fns-tz'
// import { es } from 'date-fns/locale'

export const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function getToken(state){
  if(state){
    return state.auth ? state.auth.token : null
  }else{
    return null
  }
}

export function getAuthHeaders(state){
  const token = getToken(state)

  if(token){
    return {
      Authorization: 'Bearer ' + token
    }
  }else{
    return {}
  }
}

export function createAction(type, keys = []){
  const fn = function(){
    const args = keys.reduce((acc, item, idx) => {
      acc[item] = arguments[idx]
      return acc
    }, {})

    return { type, ...args }
  }

  return [
    type,
    fn
  ]
}

export function useQuery(){
  const query = new URLSearchParams(useLocation().search);
  const items = {}

  for(let entry of query.entries()){
    items[entry[0]] = entry[1]
  }

  return items
}

export function toQueryString(query){
  return Object.keys(query).reduce((acc, key) => {
    if( query[key] ){
      acc.push(`${key}=${query[key]}`)
    }

    return acc
  }, []).join('&')
}

// export function toUTCString(date){
//   return date.toISOString().replace('T', ' ').replace('Z', '')
// }

// export function formatDate(date, formatString='dd/MM/yyyy HH:mm'){
//   return format(utcToZonedTime(date + 'Z', TIME_ZONE), formatString, { locale: es })
// }




