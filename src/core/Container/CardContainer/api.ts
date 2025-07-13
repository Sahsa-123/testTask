export interface CardTemplateI{
  children: [React.ReactElement, React.ReactElement, React.ReactElement, React.ReactElement];
  height: `${number}px`|`${number}%`|"auto";
  width: `${number}px`|`${number}%`|"auto";
  
  outerStyles?:string
}