/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* import-globals-from ../editorUtilities.js */
/* import-globals-from EdDialogCommon.js */

//  ################################################################################################
//                      Objects
//  ################################################################################################
function ErgEcpLpcBuffer(_i_str, _i_max_card)
{
  //  **********************************************************************************************
  //  d_array
  //  a_max_card
  //  **********************************************************************************************
  this.dump=function()
  {
    var i;
    //  ............................................................................................
    console.log("ErgEcpLpcBuffer::Dump():"+this.d_array.length);
    for ( i = 0 ; i != Math.min(this.d_array.length, this.a_max_card) ; i ++ )
    {
      console.log("[" + i + "]:" + "[" + this.d_array[i] + "]");
    }
  }
  //  ==============================================================================================
  this.construct=function(_i_str, _i_max_card)
  {
    var s, a, i;
    //  ............................................................................................
    erg_ecp_log("ErgEcpLpcBuffer::construct():[" + _i_str + "]");
    //  ............................................................................................
    if ( ( _i_str != undefined ) && ( _i_str != null ) )
    {
      s  = _i_str.trim();
    }
    else
    {
      s = "";
    }
    //  ............................................................................................
    if ( ( _i_max_card == undefined ) || ( _i_max_card == null ) || ( _i_max_card < 0 ) )
    {
      this.a_max_card = 10;
    }
    else
    {
      this.a_max_card = _i_max_card;
    }
    //  ............................................................................................
    this.d_array  = new Array();

    //  __ERG_TEK__ When you split an empty string, javascript returns an array with 1 element
    //  containing 1 empty string. Why does it not return an empty array ??????
    if ( _i_str.length != 0 )
    {
      a = _i_str.split(" ");

      for ( i = 0 ; i < Math.min(a.length, this.a_max_card) ; i++ )
      {
        this.d_array[i] = a[i];
      }
    }
  }
  //  ==============================================================================================
  this.reset=function()
  {
    this.d_array=new Array();
  }
  //  ==============================================================================================
  this.has=function(_i_s)
  {
    var i;
    var s;
    //  ............................................................................................
    for ( i = 0; i < this.d_array.length ; i++ )
    {
        s = this.d_array[i];

        if ( _i_s.localeCompare(s) == 0 )
        {
            return i;
        }
    }

    return -1;
  }
  //  ==============================================================================================
  this.prepend=function(_i_str)
  {
    var l, m, i, p;
    //  ............................................................................................
    //  console.log("Prepend");

    l = this.d_array.length;
    m = this.a_max_card;

    if    ( l == m )    { p = m - 1;  }
    else                { p = l;      }

    for ( i = p ; i >= 1 ; i-- )
    {
      this.d_array[i] = this.d_array[i-1];
    }

    this.d_array[0] = _i_str;
  }
  //  ==============================================================================================
  this.get=function(_i_i)
  {
    //  ............................................................................................
    if ( ( _i_i >= 0 ) && ( _i_i < this.d_array.length ) )
    {
      return this.d_array[_i_i];
    }
    else
    {
      return null;
    }
  }

  this.set=function(_i_i, _i_s)
  {
    //  ............................................................................................
    if ( ( _i_i >= 0 ) && ( _i_i < this.d_array.length ) )
    {
      this.d_array[_i_i] = _i_s;
    }
  }
  //  ==============================================================================================
  this.get_string=function()
  {
    return this.d_array.join(' ');
  }
  //  **********************************************************************************************
  this.construct(_i_str, _i_max_card);
}

function ErgEcpCssColor(_i_hex, _i_css_name, _i_color_family)
{
  this.hex            = _i_hex;
  this.css_name       = _i_css_name;
  this.color_family   = _i_color_family;
}

function  erg_init_colors_array()
{
__ERG_MARK__CSS_COLORS_JS_01__
}
//  ################################################################################################
//                      Utils
//  ################################################################################################
function erg_ecp_log(_i_s)
{
  if ( gErgEcp.log == true )
  {
    console.log(_i_s);
  }
}

function erg_ecp_util__set_window_location()
{
  gLocation = document.getElementById("location");
  if (gLocation)
  {

    var px = window.opener.screenX;
    var py = window.opener.screenY;

    var ox = gLocation.getAttribute("offsetX");
    var oy = gLocation.getAttribute("offsetY")

    var aw = screen.availWidth;
    var ah = screen.availHeight;

    var iw = window.innerWidth;
    var ih = window.innerHeight;

    //erg_ecp_log("SetWindowLocation():px[" + px + "] py[" + py + "]");
    //erg_ecp_log("                   :ox[" + ox + "] oy[" + oy + "]");
    //erg_ecp_log("                   :aw[" + aw + "] ah[" + ah + "]");
    //erg_ecp_log("                   :iw[" + iw + "] ih[" + ih + "]");

    var cx = Number(px) + Number(ox);
    var cy = Number(py) + Number(oy);

    //erg_ecp_log("                   :cx[" + cx + "] cy[" + cy + "]");
    //erg_ecp_log("                   :wx[" + screen.width + "]");

    window.moveTo(cx,cy);
  }
}

function erg_ecp_util__is_hexdigit(_i_c)
{
  if  (
            ( ( _i_c >= 48 ) && ( _i_c <= 57 ) )  ||
            ( ( _i_c >= 65 ) && ( _i_c <= 70 ) )  ||
            ( ( _i_c >= 97 ) && ( _i_c <= 102) )
      )
  {
    return true;
  }
  return false;
}

function erg_ecp_util__check_color_string_validity__hex(_i_s)
{
  var l, i, c;
  //  ..............................................................................................
  l = _i_s.length;

  if ( ( l == 0 ) || ( l > 7 ) )
    return eErgEcpColorValidity.N;

  if ( _i_s[0] != '#' )
  {
    return eErgEcpColorValidity.N;
  }

  if ( l == 1 )
    return eErgEcpColorValidity.MHEX;

  for ( i = 1 ; i != l ; i++ )
  {
    c = _i_s.charCodeAt(i);

    //erg_ecp_log("--> " + c);

    if  ( ! erg_ecp_util__is_hexdigit(c) )
    {
      //erg_ecp_log("    bad");
      return eErgEcpColorValidity.N;
    }
    //else
    //{
    //  erg_ecp_log("    ok");
    //}
  }
  return eErgEcpColorValidity.YHEX;
}

function erg_ecp_util__check_color_string_validity__css(_i_name)
{
  var s, l, i;
  //  ..............................................................................................
  l = _i_name.length;

  if ( l == 0 )
    return eErgEcpColorValidity.N;

  s = _i_name.toLowerCase();

  for ( i = 0 ; i != gErgEcp.Colors.Css.length ; i++ )
  {
    if ( gErgEcp.Colors.Css[i].css_name.startsWith(s) )
    {
      if ( gErgEcp.Colors.Css[i].css_name == s )
      {
        return eErgEcpColorValidity.YCSS;
      }
      else
      {
        return eErgEcpColorValidity.MCSS;
      }
    }
  }
  return eErgEcpColorValidity.N;
}

function erg_ecp_util__check_color_string_validity(_i_s)
{
  if ( _i_s.length == 0 )
    return eErgEcpColorValidity.N;

  if ( _i_s[0] == '#' )
    return erg_ecp_util__check_color_string_validity__hex(_i_s);

  return erg_ecp_util__check_color_string_validity__css(_i_s);
}

function erg_ecp_util__get_color_hex_from_css(_i_css)
{
  var s, i;
  //  ..............................................................................................
  s = _i_css.toLowerCase();

  for ( i = 0 ; i != gErgEcp.Colors.Css.length ; i++ )
  {
    if ( gErgEcp.Colors.Css[i].css_name == _i_css )
    {
      return gErgEcp.Colors.Css[i].hex;
    }
  }
  return "";
}
//  ################################################################################################
//                    Currently selected color
//  ################################################################################################
function erg_ecp_cur__set_swatch(_i_c)
{
  gDialog.ColorSwatch.setAttribute(
    "style",
    `background-color: ${TrimString(_i_c) || "inherit"}`
    );

  gErgEcp.Widgets.Input.btn.style.setProperty("background-color", _i_c);

  erg_ecp_log("erg_ecp_cur__set_swatch():[" + _i_c + "]");
}

function erg_ecp_cur__set(_i_c)
{
  var c;
  //  ..............................................................................................
  erg_ecp_log(_i_c);

  c = _i_c;

  if ( ( c == undefined ) || ( c == null ) )
  {
    c = "";
  }

  gColor = TrimString(c).toLowerCase();

  if ( gColor == "mixed" )
  {
    gColor = "";
  }

  erg_ecp_cur__set_swatch(gColor);
}
//  ################################################################################################
//                    Dialog box buttons ( OK, Cancel, ... )
//  ################################################################################################
function onAccept(event)
{
  if ( NoDefault && !gColor )
  {
    ShowInputErrorMessage(GetString("NoColorError"));
    SetTextboxFocus(gErgEcp.Widgets.Input.txt);
    event.preventDefault();
    return false;
  }
  //  ..............................................................................................
  //  update last picked colors list
  //  dont update the grid because we are leaving the dialog
  //  memorize the buffer in the DOM string
  if ( gColor.length > 0 )
  {
    erg_ecp_lpc__colors_list__prepend_color(gColor);
  }
  erg_ecp_lpc__colors_list__save_to_DOM();
  //  ..............................................................................................
  //  Set return values and save in persistent color attributes
  if (TextType) {
    gColorObj.TextColor = gColor;
    if (gColor.length > 0) {
        //  ERG+
        //      gDialog.LastPickedColor.setAttribute("LastTextColor", gColor);
        gErgEcp.Widgets.Lpc.vbox.setAttribute("LastTextColor", gColor);
        // ERG-
      gColorObj.LastTextColor = gColor;
    }
  } else if (HighlightType) {
    gColorObj.HighlightColor = gColor;
    if (gColor.length > 0) {
        // ERG+
        //      gDialog.LastPickedColor.setAttribute("LastHighlightColor", gColor);
        gErgEcp.Widgets.Lpc.vbox.setAttribute("LastHighlightColor", gColor);
        // ERG-
      gColorObj.LastHighlightColor = gColor;
    }
  } else {
    gColorObj.BackgroundColor = gColor;
    if (gColor.length > 0) {
        // ERG+
        //      gDialog.LastPickedColor.setAttribute("LastBackgroundColor", gColor);
        gErgEcp.Widgets.Lpc.vbox.setAttribute("LastBackgroundColor", gColor);
        // ERG-
      gColorObj.LastBackgroundColor = gColor;
    }
    // If table or cell requested, tell caller which element to set on
    if (TableOrCell && gDialog.TableRadio.selected) {
      gColorObj.Type = "Table";
    }
  }

  SaveWindowLocation();
  return true;
}

function onCancelColor()
{
  //  This function is called when user clicks the Cancel button, or dismiss the dialog
  //  by clicking on the windowmanager's "close window" button

  // Tells caller that user canceled
  gColorObj.Cancel = true;
  SaveWindowLocation();
}

function onDefault()
{
  erg_ecp_cur__set(gErgEcp.DefCol.passed_in);
  gErgEcp.Widgets.Input.txt.focus();
  //SetDefaultToOk();
}
//  ################################################################################################
//                    Color Picker
//  ################################################################################################
function erg_ecp_cpk__cbk_changed()
{
  var color = gDialog.ColorPicker.value;
  if (color)
  {
    erg_ecp_cur__set(color);                                                                        //  hex color
  }
}

function erg_ecp_cpk__cbk_keypress(aEvent)
{
  if (aEvent.charCode == aEvent.DOM_VK_SPACE) {
    erg_ecp_cpk__cbk_changed();
    //SetDefaultToOk();
  }
}
//  ################################################################################################
//                    CSS colors
//  ################################################################################################
function erg_ecp_css__cbk_changed(_i_evt)
{
  gErgEcp.Widgets.Css.btn.style.setProperty("background-color", _i_evt.target.value);
  gErgEcp.Widgets.Css.btn.setAttribute("erg_ecp_VDOM_css__btn_bg_col_hex", _i_evt.target.value);

  //  change the global selected color, avoiding the user having to click the button
  erg_ecp_cur__set(_i_evt.target.value);                                                            //  hex color

  return true;
}

function erg_ecp_css__cbk_clicked()
{
  //  if we read the "background-color" property value, we get rgb(a,b,c) crap
  //  so we have to store it in a additionnal attribute "erg_ecp_VDOM_css__btn_bg_col_hex"
  let c = gErgEcp.Widgets.Css.btn.getAttribute("erg_ecp_VDOM_css__btn_bg_col_hex");

  // set global color
  erg_ecp_cur__set(c);                                                                              //  hex color

  return true;
}
//  ################################################################################################
//                    INPUT colors
//  ################################################################################################
function erg_ecp_inp__set_input_validity(_i_v)
{
  //  ..............................................................................................
  if  (
        ( _i_v == eErgEcpColorValidity.Y    )   ||
        ( _i_v == eErgEcpColorValidity.YHEX )   ||
        ( _i_v == eErgEcpColorValidity.YCSS )
      )
  {
    gErgEcp.Widgets.Input.txt.style.setProperty("background-color", "#dafad9");
    return;
  }

  if  (
        ( _i_v == eErgEcpColorValidity.YDEF )   ||
        ( _i_v == eErgEcpColorValidity.M    )   ||
        ( _i_v == eErgEcpColorValidity.MHEX )   ||
        ( _i_v == eErgEcpColorValidity.MCSS )
      )
  {
    gErgEcp.Widgets.Input.txt.style.setProperty("background-color", "#ffffff");
    return;
  }

  if ( _i_v == eErgEcpColorValidity.N )
  {
    gErgEcp.Widgets.Input.txt.style.setProperty("background-color", "#fac5c6");
    return;
  }
}

function erg_ecp_inp__check_input_validity()
{
  var s, l, i, c;
  //  ..............................................................................................
  s = gErgEcp.Widgets.Input.txt.value;
  l = s.length;

  //  empty color is OK, it is "default" color
  if ( l == 0 )
    return eErgEcpColorValidity.YDEF;

  return erg_ecp_util__check_color_string_validity(s);
}

function erg_ecp_inp__cbk_input()
{
  var v;
  //  ..............................................................................................
  //  verify the syntax of input text
  //  color has to be #xxxxxx, css color name, or empty
  //  expected value :
  //  eErgEcpColorValidity. N
  //                        YDEF
  //                        MHEX
  //                        YHEX
  //                        MCSS
  //                        YCSS
  v = erg_ecp_inp__check_input_validity();

  erg_ecp_inp__set_input_validity(v);

  if  (
        ( v == eErgEcpColorValidity.YDEF )  ||
        ( v == eErgEcpColorValidity.YHEX )
      )
  {
    erg_ecp_cur__set(gErgEcp.Widgets.Input.txt.value);                                              //  hex / ""
    return;
  }

  if  ( v == eErgEcpColorValidity.YCSS )
  {
    erg_ecp_cur__set(erg_ecp_util__get_color_hex_from_css(gErgEcp.Widgets.Input.txt.value));        //  css -> hex
    return;
  }

  //erg_ecp_log("erg_LPC_inp_cbk_select():s[" + s + "]");
}
//  ################################################################################################
//                    Last Picked Colors
//  ################################################################################################
function erg_ecp_lpc__update_xul_grid()
{
    var i, j, k;
    var c;
    var row, mi;
    //  ............................................................................................
    //console .log("erg_LPC_lpc_uxg():grid [" + gErgEcp.Widgets.Lpc.grid + "]");
    //console .log("erg_LPC_lpc_uxg():rows [" + gErgEcp.Widgets.Lpc.grid_rows + "]");
    //console .log("erg_LPC_lpc_uxg():#rows[" + gErgEcp.Widgets.Lpc.grid_rows.childNodes.length + "]");

    //r = s.split(" ");
    //l = r.length;

    //erg_ecp_log("erg_LPC_lpc_uxg():   s:[" + s + "]");
    //erg_ecp_log("erg_LPC_lpc_uxg():  #r:[" + l + "]");
    //erg_ecp_log("erg_LPC_lpc_uxg():r[0]:[" + r[0] + "]");
    //erg_ecp_log("erg_LPC_lpc_uxg():r[1]:[" + r[1] + "]");

    for ( i = 0; i < gErgEcp.Lpc.grid_rows_card ; i++ )
    {
        row = gErgEcp.Widgets.Lpc.grid_rows.childNodes[i];

        for ( j = 0; j < 4 ; j++ )
        {
            mi = row.childNodes[j];

            //console .log("erg_LPC_update_last_picked_colors():row [" + row + "]");
            //console .log("erg_LPC_update_last_picked_colors(): mi [" + mi  + "]");

            k = i * 4 + j;

            // there is a range check in the get() method, so we can call directly
            c = gErgEcp.Lpc.buffer.get(k);

            if ( c == null )
            {
                c = "#cccccc";
            }

            mi.style.setProperty("background-color", c);
            mi.value = c;

            //erg_ecp_log("erg_LPC_lpc_uxg():[" + i + "][" + j + "]=[" + c + "]");
        }
     }
}

function erg_ecp_lpc__colors_list__load_from_DOM()
{
  gErgEcp.Lpc.buffer                =   new ErgEcpLpcBuffer(
    gErgEcp.Widgets.Lpc.mnl.getAttribute("erg_ecp_VDOM_lpc__picked_colors") ,
    gErgEcp.Lpc.card                                                        );
}

function erg_ecp_lpc__colors_list__save_to_DOM()
{
  gErgEcp.Widgets.Lpc.mnl.setAttribute
    ( "erg_ecp_VDOM_lpc__picked_colors" ,
      gErgEcp.Lpc.buffer.get_string()   );

  erg_ecp_log("erg_ecp_lpc__colors_list__save_to_DOM():");
  gErgEcp.Lpc.buffer.dump();

}

function erg_ecp_lpc__colors_list__prepend_color(_i_c)
{
    var s;
    var a1, l1;
    var a2;
    var i, card;
    //  ............................................................................................
    erg_ecp_log("lpc_cl_pc():[" + _i_c + "]");

    if ( gErgEcp.Lpc.buffer.has(_i_c) >= 0 )
    {
      erg_ecp_log("lpc_cl_pc():already present [" + _i_c + "]");
      return;
    }

    //  roll the list and add the new color at the first place
    gErgEcp.Lpc.buffer.prepend(_i_c);
    gErgEcp.Lpc.buffer.dump();
}

function erg_ecp_lpc__colors_list__reset()
{
  gErgEcp.Lpc.buffer.reset();
  erg_ecp_lpc__update_xul_grid();

  //  In case of a future user's cancel, the reseted colors would not be saved. So save them now.
  erg_ecp_lpc__colors_list__save_to_DOM();
}

function erg_ecp_lpc__cbk_changed(_i_evt)
{
  var v;
  //  ..............................................................................................
  v = _i_evt.target.value;

  if ( v.localeCompare("#RESET") == 0 )
  {
    erg_ecp_log("--- RESET ---")
    erg_ecp_lpc__colors_list__reset();
    return;
  }

  gErgEcp.Widgets.Lpc.btn.style.setProperty("background-color", v);
  gErgEcp.Widgets.Lpc.btn.setAttribute("erg_ecp_VDOM_lpc__btn_bg_col_hex", v);

  gErgEcp.Widgets.Lpc.mnl.setAttribute("label", "Last-picked colors");

  //  change the global selected color, avoiding the user having to click the button
  erg_ecp_cur__set(v);                                                            //  hex color
}

function erg_ecp_lpc__cbk_clicked()
{
  //  if we read the "background-color" property value, we get rgb(a,b,c) crap
  //  so we have to store it in a additionnal attribute "erg_ecp_VDOM_lpc__btn_bg_col_hex"
  let c = gErgEcp.Widgets.Lpc.btn.getAttribute("erg_ecp_VDOM_lpc__btn_bg_col_hex");

  // set global color
  erg_ecp_cur__set(c);                                                                              //  hex color

  return true;
}
//  ################################################################################################
//                    Main
//  ################################################################################################
var insertNew = true;
var tagname = "TAG NAME";
var gColor = "";
var LastPickedColor = "";
var ColorType = "Text";
var TextType = false;
var HighlightType = false;
var TableOrCell = false;
var NoDefault = false;
var gColorObj;

var gErgEcp;

var gErgWidgets;

const   eErgEcpColorValidity =
{
  "Y"     :10   ,
  "YHEX"  :11   ,
  "YCSS"  :12   ,
  "YDEF"  :13   ,
  "M"     :20   ,
  "MHEX"  :21   ,
  "MCSS"  :22   ,
  "N"     :30
};
Object.freeze(eErgEcpColorValidity)

document.addEventListener("dialogaccept", onAccept);
document.addEventListener("dialogcancel", onCancelColor);

function Startup() {
  if (!window.arguments[1]) {
    dump("EdColorPicker: Missing color object param\n");
    return;
  }

  // window.arguments[1] is object to get initial values and return color data
  gColorObj = window.arguments[1];
  gColorObj.Cancel = false;

  gDialog.ColorPicker       = document.getElementById("ColorPicker");
  gDialog.CellOrTableGroup  = document.getElementById("CellOrTableGroup");
  gDialog.TableRadio        = document.getElementById("TableRadio");
  gDialog.CellRadio         = document.getElementById("CellRadio");
  gDialog.ColorSwatch       = document.getElementById("ColorPickerSwatch");
  gDialog.Ok                = document.querySelector("dialog").getButton("accept");
  gDialog.Location          = document.getElementById("location");
  //  ..............................................................................................
  gErgEcp                           =   new Object();

    gErgEcp.log                     =   true;

    gErgEcp.Lpc                     =   new Object();

    gErgEcp.DefCol                  =   new Object();
      gErgEcp.DefCol.passed_in      =   new Object();

    gErgEcp.Widgets                 =   new Object();
      gErgEcp.Widgets.Lpc           =   new Object();
      gErgEcp.Widgets.Css           =   new Object();
      gErgEcp.Widgets.Input         =   new Object();

    gErgEcp.Colors                  =   new Object();
      gErgEcp.Colors.Css            =   new Array();

  gErgEcp.Widgets.Lpc.vbox          =   document.getElementById("erg_ecp_EDOM_lpc__vbox");
  gErgEcp.Widgets.Lpc.btn           =   document.getElementById("erg_ecp_EDOM_lpc__btn");
  gErgEcp.Widgets.Lpc.mnl           =   document.getElementById("erg_ecp_EDOM_lpc__mnl");
  gErgEcp.Widgets.Lpc.grid          =   document.getElementById("erg_ecp_EDOM_lpc__grid");
  gErgEcp.Widgets.Lpc.grid_rows     =   document.getElementById("erg_ecp_EDOM_lpc__grid_rows");
  gErgEcp.Widgets.Css.mnl           =   document.getElementById("erg_ecp_EDOM_css__mnl");
  gErgEcp.Widgets.Css.btn           =   document.getElementById("erg_ecp_EDOM_css__btn");
  gErgEcp.Widgets.Input.btn         =   document.getElementById("erg_ecp_EDOM_inp__btn");
  gErgEcp.Widgets.Input.txt         =   document.getElementById("erg_ecp_EDOM_inp__txt");

  gErgEcp.Lpc.grid_rows_card        =   gErgEcp.Widgets.Lpc.grid_rows.childElementCount;
  gErgEcp.Lpc.card                  =   gErgEcp.Lpc.grid_rows_card * 4;
  erg_ecp_lpc__colors_list__load_from_DOM();
  gErgEcp.Lpc.buffer.dump();

  erg_init_colors_array();
  erg_ecp_lpc__update_xul_grid();

  gErgEcp.Widgets.Lpc.mnl.setAttribute("label", "Last-picked colors");
  gErgEcp.Widgets.Css.mnl.setAttribute("label", "CSS colors");
  //  ..............................................................................................
  //  determine the type of color we are setting:
  //     - text       : Text, Link, ActiveLink, VisitedLink,
  //  or - background : Page, Table, or Cell
  if (gColorObj.Type)
  {
    ColorType = gColorObj.Type;
    // Get string for dialog title from passed-in type
    //   (note constraint on editor.properties string name)
    let IsCSSPrefChecked = Services.prefs.getBoolPref("editor.use_css");

    if (GetCurrentEditor())
    {
      if (ColorType == "Page" && IsCSSPrefChecked && IsHTMLEditor())
      {
        document.title = GetString("BlockColor");
      }
      else
      {
        document.title = GetString(ColorType + "Color");
      }
    }
  }

  var tmpColor;
  var haveTableRadio = false;
  //  ..............................................................................................
  //  determine the default color of the color type we are setting
  switch (ColorType)
  {
    case "Page":
      tmpColor = gColorObj.PageColor;
      if (tmpColor && tmpColor.toLowerCase() != "window")
      {
        gColor = tmpColor;
      }
      break;

    case "Table":
      if (gColorObj.TableColor)
      {
        gColor = gColorObj.TableColor;
      }
      break;

    case "Cell":
      if (gColorObj.CellColor)
      {
        gColor = gColorObj.CellColor;
      }
      break;

    case "TableOrCell":
      TableOrCell = true;
      document.getElementById("TableOrCellGroup").collapsed = false;
      haveTableRadio = true;
      if (gColorObj.SelectedType == "Cell")
      {
        gColor = gColorObj.CellColor;
        gDialog.CellOrTableGroup.selectedItem = gDialog.CellRadio;
        gDialog.CellRadio.focus();
      }
      else
      {
        gColor = gColorObj.TableColor;
        gDialog.CellOrTableGroup.selectedItem = gDialog.TableRadio;
        gDialog.TableRadio.focus();
      }
      break;

    case "Highlight":
      HighlightType = true;
      if (gColorObj.HighlightColor)
      {
        gColor = gColorObj.HighlightColor;
      }
      break;

    default:
      // Any other type will change some kind of text,
      TextType = true;
      tmpColor = gColorObj.TextColor;
      if (tmpColor && tmpColor.toLowerCase() != "windowtext")
      {
        gColor = gColorObj.TextColor;
      }
      break;
  }

  erg_ecp_log("Startup():ColorType[" + ColorType + "] TextType[" + TextType + "]")

  // Set initial color in input field and in the colorpicker
  gErgEcp.DefCol.passed_in  = gColor;
  gDialog.ColorPicker.value = gColor;
  erg_ecp_cur__set(gColor);
  //  ..............................................................................................
  //  determine the last picked color of color type we are setting
  //  2 ways : use last-picked colors passed in, or those persistent on dialog
  if (TextType)
  {
    if (!("LastTextColor" in gColorObj) || !gColorObj.LastTextColor)
    {
        gColorObj.LastTextColor = gErgEcp.Widgets.Lpc.vbox.getAttribute("LastTextColor");
    }
    LastPickedColor = gColorObj.LastTextColor;
  }
  else if (HighlightType)
  {
    if (!("LastHighlightColor" in gColorObj) || !gColorObj.LastHighlightColor)
    {
        gColorObj.LastTextColor = gErgEcp.Widgets.Lpc.vbox.getAttribute("LastHighlightColor");
    }
    LastPickedColor = gColorObj.LastHighlightColor;
  }
  else
  {
    if ( !("LastBackgroundColor" in gColorObj) || !gColorObj.LastBackgroundColor )
    {
            gColorObj.LastBackgroundColor = gErgEcp.Widgets.Lpc.vbox.getAttribute("LastBackgroundColor");
    }
    LastPickedColor = gColorObj.LastBackgroundColor;
  }
  erg_ecp_log("Startup():LastPickedColor[" + LastPickedColor + "]")
  //  ..............................................................................................
  //  set the widgets color according to the LastPickedColor
  if ( ! LastPickedColor )
  {
    erg_ecp_log("Startup():!LastPickedColor");
    gErgEcp.Widgets.Lpc.btn.style.setProperty("background-color", "inherit");
    gErgEcp.Widgets.Lpc.btn.setAttribute("erg_ecp_VDOM_lpc__btn_bg_col_hex", "");
    // Hide the button, as there is no last color available.
    // ERG+
    //      gDialog.LastPickedButton.hidden = true;
    // ERG-
  } else
  {
    // ERG+
    //      gDialog.LastPickedColor.setAttribute(
    //      "style",
    //      "background-color: " + LastPickedColor
    //      );
    gErgEcp.Widgets.Lpc.btn.style.setProperty("background-color", LastPickedColor);
    gErgEcp.Widgets.Lpc.btn.setAttribute("erg_ecp_VDOM_lpc__btn_bg_col_hex", LastPickedColor);

    erg_ecp_lpc__update_xul_grid();
    // ERG-

    // Set method to detect clicking on OK button
    //  so we don't get fooled by changing "default" behavior
    //gDialog.Ok.setAttribute("onclick", "SetDefaultToOk()");

    // Make "Last-picked" the default button, until the user selects a color.
    //gDialog.Ok.removeAttribute("default");
    // ERG+
    //      gDialog.LastPickedButton.setAttribute("default", "true");
    //gErgEcp.Widgets.Lpc.btn.setAttribute("default", "true");
    // ERG-
  }

  // Caller can prevent user from submitting an empty, i.e., default color
  NoDefault = gColorObj.NoDefault;
  if (NoDefault) {
    // Hide the "Default button -- user must pick a color
    document.getElementById("DefaultColorButton").collapsed = true;
  }

  // Set focus to colorpicker if not set to table radio buttons above
  if (!haveTableRadio) {
    gDialog.ColorPicker.focus();
  }

  //SetWindowLocation();
  erg_ecp_util__set_window_location();
}
//  ################################################################################################
//                    Old code
//  ################################################################################################
/*
function SetDefaultToOk() {

    erg_ecp_log("SetDefaultToOk():+");

    // ERG+
    //      gDialog.LastPickedButton.removeAttribute("default");
    gErgEcp.Widgets.Lpc.btn.removeAttribute("default");
    // ERG-
  gDialog.Ok.setAttribute("default", "true");
}
*/

