<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
	<div id="sudoku">
				<table>
					<tr>
					 <xsl:for-each select="/sudoku/row">
						<xsl:for-each select="/class/cell">
							<td contenteditable="true"></td>
						<xsl:for-each>		
					 <xsl:for-each>

	</div>
	<div id="check-sudoku">Check it out!</div >
	<div id="submit-sudoku">Submit</div >
	</xsl:stylesheet>