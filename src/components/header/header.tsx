import s from "./header.module.scss"

type HeaderProps = {
  content: string
}

export const Header = ({ content }: HeaderProps) => {
  return <div className={s.header}>{content}</div>
}
