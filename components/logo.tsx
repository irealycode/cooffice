interface LogoParams{
    font? : string
    width? : string
    white?: boolean
    mono?: boolean
}


export default function Logo({font="lg",width="6",white=false,mono=false}:LogoParams) {

  return (
    <div className={`ml-2 text-${font} text-${mono?"white":"blue-600"} font-normal flex flex-center justify-center items-center`}> C<img src="/assets/images/desk.svg" className={`w-${width} ml-[2px] ${white || mono?'invert':''}`} />ffice</div>
  )
}
