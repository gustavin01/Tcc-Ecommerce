import "./banner.css"
import { Helmet } from "react-helmet";
import "../../js/banner.js";

export default function Banner(){
    return(
        <div>
            <ul id="adaptive" className="cs-hidden">
                    <li className="item-a">
                <div className="full-slider-box f-slide-1">
                </div>
                    </li>
                    
                    <li className="item-b">
                <div className="full-slider-box f-slide-2">
                </div>
                    </li>
                
                    <li className="item-c">
                <div className="full-slider-box f-slide-3">
                </div>
                    </li>
            
            </ul>

            <Helmet>
                <script>
                    {`
                    $(document).ready(function() {
                        $('#adaptive').lightSlider({
                            adaptiveHeight:true,
                            auto:true,
                            item:1,
                            slideMargin:0,
                            loop:true
                        });
                    });
                    $(document).ready(function() {
                    $('#autoWidth').lightSlider({
                        autoWidth:true,
                        loop:true,
                        onSliderLoad: function() {
                            $('#autoWidth').removeClass('cS-hidden');
                        } 
                        });  
                    });
                    `}
                </script>
            </Helmet>

        </div>
    )

}