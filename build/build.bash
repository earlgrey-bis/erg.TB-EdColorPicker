#!/bin/bash
# **************************************************************************************************
source "${ERG__PATH_BINARIES}/build-tools/erg.build-tools_main.bash"

erg_bt__init
# **************************************************************************************************
PARAM1="$1"

TplFileXhtml="./src/EdColorPicker-template.xhtml"
TplFileJs="./src/EdColorPicker-template.js"

IFileXhtml="./res/css-colors.xhtml"
IFileJs="./res/css-colors.js"

TmpFileXhtml="./obj/tmp/EdColorPicker.xhtml"
TmpFileJs="./obj/tmp/EdColorPicker.js"

OptGenColors=""
OptExport=""
# ##################################################################################################
function  ecp_export__EdColorPicker_xhtml
{
  erg_bt__msg "copy xhtml file"
  cp "${TmpFileXhtml}" "/home/sys/usr/local/Thunderbird/omni/chrome/messenger/content/messenger/messengercompose/EdColorPicker.xhtml"
}

function  ecp_export__EdColorPicker_js
{
  erg_bt__msg "copy js file"
  cp "${TmpFileJs}" "/home/sys/usr/local/Thunderbird/omni/chrome/messenger/content/messenger/messengercompose/EdColorPicker.js"
}
# **************************************************************************************************
function  ecp_gen__EdColorPicker_xhtml
{
  erg_bt__msg "generating EdColorPicker.xhtml"

  erg_bt__msg_cnt "converting file fore sed"
  CssXhtml=$( sed '$!s/$/\\n/'  "${IFileXhtml}" | tr -d '\n'  | sed 's/\//\\\//g' )
  #echo "${CssXhtml}"

  erg_bt__msg_cnt "inserting xhtml code"
  sed "s/__ERG_MARK__CSS_COLORS_XHTML_01__/${CssXhtml}/" "${TplFileXhtml}" > "${TmpFileXhtml}"
}
function  ecp_gen__EdColorPicker_js
{
  erg_bt__msg "generating EdColorPicker.js"

  erg_bt__msg_cnt "converting file fore sed"
  CssJs=$( sed '$!s/$/\\n/'  "${IFileJs}" | tr -d '\n'  | sed 's/\//\\\//g' )
  #echo "${CssJs}"

  erg_bt__msg_cnt "inserting js code"
  sed "s/__ERG_MARK__CSS_COLORS_JS_01__/${CssJs}/" "${TplFileJs}" > "${TmpFileJs}"
}
# ##################################################################################################
for Opt in "$@" ; do

  if [[ "${Opt}" == "--gencolors" ]]  ; then OptGenColors="1"     ; fi
  if [[ "${Opt}" == "--export" ]]     ; then OptExport="1"        ; fi

done
# **************************************************************************************************
if [[ "${OptGenColors}" == "1" ]] ; then

  erg_bt__msg "generating colors (.js & .xhtml )"

    erg_bt__log_spc_inc
    erg_bt__vars_export
    cd res
    chmod u=rwx "css-colors--generate.bash"
    ./css-colors--generate.bash
    cd ../
    erg_bt__vars_import
    erg_bt__log_spc_dec

fi

ecp_gen__EdColorPicker_js
ecp_gen__EdColorPicker_xhtml

if [[ "${OptExport}" == "1" ]] ; then

  ecp_export__EdColorPicker_xhtml

  ecp_export__EdColorPicker_js

fi
