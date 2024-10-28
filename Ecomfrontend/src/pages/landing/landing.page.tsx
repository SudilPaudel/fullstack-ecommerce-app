import { ReactNode, } from "react"
import { HomeBannerComponent } from "../../components/banner"
import { SingleProductGrid,  SectionTitle } from "../../components/common"


const LandingPage = (): ReactNode => {

    // state maintainence 



    return (
        <>
            

            <HomeBannerComponent />
            <SectionTitle>
                Brand Choice
            </SectionTitle>
            <div className="bg-lime-50 my-10">
                <SectionTitle>
                    Customer's Choice
                </SectionTitle>
                    <div className="mx-auto px-4  lg:max-w-7xl lg:px-8 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />
                        <SingleProductGrid />

                        {/* <!-- More products... --> */}
                    </div>
            </div>

            
        </>
    )
}
export default LandingPage


