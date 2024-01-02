import letsPlayImage from '@/assets/letsPlay.jpg';

type props = {
    fliped: boolean;
};

export default function Card(props: props) {
    let cardStyles = 'rounded-md border shadow-2xl hover:border-4';

    return props.fliped ? (
        <div className={cardStyles}></div>
    ) : (
        <img src={letsPlayImage} alt="Neon Lighs Let's Play Image" className={cardStyles} />
    );
}
