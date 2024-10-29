import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"

// to be removed once developed
import banner1 from "../../assets/1.jpg"
import banner2 from "../../assets/2.png"
import banner3 from "../../assets/3.png"
import banner4 from "../../assets/4.jpg"
import banner5 from "../../assets/5.jpg"
import banner6 from "../../assets/6.jpg"
import banner7 from "../../assets/7.jpg"
import banner8 from "../../assets/8.jpg"
import { useSelector } from "react-redux";

const HomeBannerComponent = () => {
    var settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };
    const bannerData = useSelector((state: any) => {
        return state.banner.listAll
    })
    return (
        <>
        <div className="bg-white">
            <div className="relative isolate">
                <Slider {...settings}>
                    <div>
                        <img src={banner1} />
                    </div>
                    <div>
                    <img src={banner2} />
                    </div>
                    <div>
                    <img src={banner3} />
                    </div>
                    <div>
                    <img src={banner4} />
                    </div>
                    <div>
                    <img src={banner5} />
                    </div>
                    <div>
                    <img src={banner6} />
                    </div>
                    <div>
                    <img src={banner7} />
                    </div>
                    <div>
                    <img src={banner8} />
                    </div>
                </Slider>

            </div>
        </div>
        </>
    )
}

export default HomeBannerComponent