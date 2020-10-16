import React from 'react';
import PropTypes from 'prop-types';
import "./css/Pagination.css"

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const ELLIPSIS = 'ELIPSIS';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = ( from, to, step = 1 ) => {
    let i = from;
    const range = [];

    while ( i <= to ) {
        range.push( i );
        i += step;
    }

    return range;
}

class Pagination extends React.Component {

    componentDidMount() {
        this.goToPage( 1 );
    }

    goToPage = page => {
        const { onPageChanged = f => f } = this.props;
        const currentPage = Math.max( 1, Math.min( page, this.props.totalPages ) );

        onPageChanged( currentPage );
    }

    handleClick = page => evt => {
        evt.preventDefault();
        this.goToPage( page );
    }

    handleMoveLeft = evt => {
        evt.preventDefault();
        this.goToPage( this.props.currentPage - 1 );
    }

    handleMoveRight = evt => {
        evt.preventDefault();
        this.goToPage( this.props.currentPage + 1 );
    }


    getPageNumbers = () => {
        const totalPages = this.props.totalPages;
        const currentPage = this.props.currentPage;
        const pageNeighbours = this.props.pageNeighbours;

        const centreNumberBlocks = 1 + pageNeighbours * 2;
        let displayedPages;

        // If number of pages is less than centre block plus elipsis and end number
        if ( totalPages <= centreNumberBlocks + 2 ) {
            displayedPages = range(1, totalPages);
        } else {
            let hasLeftElipsis = currentPage - pageNeighbours > pageNeighbours;
            let hasRightElipsis = currentPage + pageNeighbours < totalPages + 1 - pageNeighbours;

            switch ( true ) {
                // handle: [1] ... [5] [6] (7) [8] [9]
                case ( hasLeftElipsis && !hasRightElipsis ): {
                    const pages = range( totalPages + 1 - centreNumberBlocks, totalPages );
                    displayedPages = [ 1, ELLIPSIS, ...pages ];
                    break;
                }

                // handle: [1] [2] (3) [4] (5) ...[9]
                case ( !hasLeftElipsis && hasRightElipsis ): {
                    const pages = range( 1, centreNumberBlocks );
                    displayedPages = [ ...pages, ELLIPSIS, totalPages ];
                    break;
                }

                // handle: [1] ... [3] [4] (5) [6] [7] ...[9]
                default: {
                    const pages = range( currentPage - pageNeighbours, currentPage + pageNeighbours );
                    displayedPages = [ 1, ELLIPSIS, ...pages, ELLIPSIS, totalPages ];
                    break;
                }
            }
        }
        return [ LEFT_PAGE, ...displayedPages, RIGHT_PAGE ];
    }

    render() {
        const pages = this.getPageNumbers();

        return (
            <nav aria-label="Pagination">
                <ul className="pagination">
                    { pages.map( ( page, index ) => {

                        if ( page === LEFT_PAGE ) return (
                            <li key={ index } className="page-item">
                                <a className="page-link" href="#" aria-label="Previous" onClick={ this.handleMoveLeft }>
                                    <span aria-hidden="true">&lt;</span>
                                </a>
                            </li>
                        );

                        if ( page === RIGHT_PAGE ) return (
                            <li key={ index } className="page-item">
                                <a className="page-link" href="#" aria-label="Next" onClick={ this.handleMoveRight }>
                                    <span aria-hidden="true">&gt;</span>
                                </a>
                            </li>
                        );

                        if ( page === ELLIPSIS ) return (
                            <li key={ index } className="page-item">
                                <a className="page-link" id="ellipsis" aria-label="Ellipsis">
                                    <span aria-hidden="true">&hellip;</span>
                                </a>
                            </li>
                        );

                        return (
                            <li key={ index } className={ `page-item${ this.props.currentPage === page ? ' active' : '' }` }>
                                <a className="page-link" href="#" onClick={ this.handleClick( page ) }>{ page }</a>
                            </li>
                        );

                    })}

                </ul>
            </nav>
        )
    }

}

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    pageNeighbours: PropTypes.number,
    onPageChanged: PropTypes.func
};

export default Pagination 