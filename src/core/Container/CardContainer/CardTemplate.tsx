import type { CardTemplateI } from "./api";
import styles from "./CardTemplate.module.css";

export const CardTemplate: React.FC<CardTemplateI> = (
    {
        children,
        height,
        width,
        outerStyles
    }
)=>{
    const additionalStyles={
        height,
        width
    }
    return(
        <div 
            className={`${styles["card-container"]} ${outerStyles}`}
            style={additionalStyles}
        >
            {
                children
            }
        </div>
    )
}