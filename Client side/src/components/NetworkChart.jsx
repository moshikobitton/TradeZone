import { useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";

export default function Network(props) {
  const nodesColors = [
    "gray",
    "yellow",
    "red",
    "green",
    "blue",
    "pink",
    "orange",
    "brown",
  ];

  const nodes = props.data.nodes;
  const links = props.data.edges;
  const selected = props.data.selected;
  const supplement = 10;
  const forceRef = useRef(null);

  useEffect(() => {
    forceRef.current.d3Force("charge").strength(-400);
  });

  return (
    <div>
      <ForceGraph2D
        height={props.height}
        onNodeClick={(country) => props.getCountryLinks(country)}
        width={props.width}
        ref={forceRef}
        linkWidth={1}
        nodeCanvasObject={(node, ctx, globalScale) => {
          ctx.beginPath();
          if (node.continent == "Europe") {
            // Circle
            ctx.arc(
              node.x,
              node.y,
              10 + supplement * node.degree,
              0,
              2 * Math.PI
            );
            
          } else if (node.continent == "Americas") {
            // Rectangle
            ctx.rect(
              node.x - 12,
              node.y - 12,
              30 + supplement * node.degree,
              15 + supplement * node.degree
            );
          } else if (node.continent == "Asia") {
            // Triangle
            ctx.moveTo(node.x, node.y - (12 + supplement * node.degree));
            ctx.lineTo(
              node.x + (12 + supplement * node.degree),
              node.y + (12 + supplement * node.degree)
            );
            ctx.lineTo(
              node.x - (12 + supplement * node.degree),
              node.y + (12 + supplement * node.degree)
            );
          } else if (node.continent == "Africa") {
            // Pentagon
            const sideLength = 12 + supplement * node.degree;
            const angle = (2 * Math.PI) / 5; // Angle between consecutive vertices of a regular pentagon
            for (let i = 0; i < 5; i++) {
              const x = node.x + sideLength * Math.cos(i * angle);
              const y = node.y + sideLength * Math.sin(i * angle);
              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            
          } else {
            // Oceania , Square
            ctx.rect(
              node.x - 15,
              node.y - 15,
              25 + supplement * node.degree,
              25 + supplement * node.degree
            );
          }
          ctx.closePath();
          ctx.fillStyle = node.name === selected ? "white" : nodesColors[node.group];
          ctx.fill();

        }}
        graphData={{ nodes, links }}
        nodeLabel={(node) => node.name + ", " + node.continent}
        linkLabel={(link) =>
          "From : " +
          link.source.name +
          "<br />To : " +
          link.target.name +
          "<br />Value : " +
          link.value.toFixed(2) +
          "M$"
        }
        linkDirectionalArrowLength={0}
        linkDirectionalArrowRdelPos={1}
        enableNodeDrag={false}
      />
    </div>
  );
}
