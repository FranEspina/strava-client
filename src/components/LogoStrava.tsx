type LogoStravaProps = {
  size: number
}

export function LogoStrava ({ size } : LogoStravaProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    height={size} width={size}
    aria-label="Strava" role="img" viewBox="0 0 512 512" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#fc4c01"></rect><path fill="#ffffff" d="M120 288L232 56l112 232h-72l-40-96-40 96z"></path><path fill="#fda580" d="M280 288l32 72 32-72h48l-80 168-80-168z"></path></g></svg>
  )
}