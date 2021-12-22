import Link from 'next/link';

export default function House(props) {
  const { picture, type, town, title } = props;
  return (
    <Link href='/houses/[id]' as={'/houses/' + props.id}>
      <a>
        <img src={picture} width='100%' alt='House picture' />
        <p>
          {type} - {town}
        </p>
        <p>{title}</p>
      </a>
    </Link>
  );
}
