export function timeConvert(num: number | undefined)
{ 
  if (num === undefined) return '0h 0min'
  const hours = Math.floor(num / 60 / 60) ;  
  const minutes = Math.floor((num / 60) % 60);
  if (hours === 0) return `${minutes}min`  
  return `${hours}h ${minutes}min`         

}

export function kmConvert(num: number | undefined, useUnits: boolean = false)
{ 
  const units = useUnits ? ' Kms' : ''
  if (num === undefined) return `0${units}`   
  const kms = (num  / 1000).toFixed(2) 
  return `${kms}${units}`         
}

export function meterConvert(num: number | undefined, useUnits: boolean = false)
{ 
  const units = useUnits ? ' mts' : ''
  if (num === undefined) return `0${units}` 
  const meters = num.toFixed(0) 
  return `${meters}${units}`         
}