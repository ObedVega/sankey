import { sankey } from './node_modules/d3-sankey';
import { select } from 'd3-selection';

function renderSankeyChart() {
    console.log('Mostrar Grafica...!');
    fetch('data.json') // Ruta que devuelve los datos
    .then(response => response.json())
    .then(data => {
        const { nodes, links } = sankey()(data); 

        const svg = select('#sankey-container')
            .append('svg')
            .attr('width', 500)
            .attr('height', 500);

        // Crea los elementos rectangulares para representar los nodos
        svg.append('g')
            .selectAll('rect')
            .data(nodes)
            .enter()
            .append('rect')
            .attr('x', d => d.x0)
            .attr('y', d => d.y0)
            .attr('height', d => d.y1 - d.y0)
            .attr('width', d => d.x1 - d.x0)
            .style('fill', 'blue'); 

        // Crea los elementos de línea para representar los enlaces
        svg.append('g')
            .selectAll('path')
            .data(links)
            .enter()
            .append('path')
            .attr('d', d3.sankeyLinkHorizontal())
            .style('stroke', 'black')
            .style('stroke-width', d => Math.sqrt(d.value)); 
    })
    .catch(error => console.error('Error al cargar los datos:', error));
   
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('render-button');
    button.addEventListener('click', renderSankeyChart);
});
