/**
 * YouTube embed plugin for Editor.js.
 *
 * @author Tei Yuan Wei
 * @license MIT License (MIT)
 * @version 1.0.0
 * 
 */

import './main.css';
import ToolboxIcon from './svg/toolbox.svg'

export default class YoutubeEmbed {

    /**
     * 
     * Get toolbox settings
     *
     * @return {{icon: string, title: string}}
     * 
     */
    static get toolbox() {
        return {
            title: "YouTube",
            icon: ToolboxIcon
        }
    }

    /**
     * 
     * Render plugin`s main Element and fill it with saved data
     *
     * @param {data: DelimiterData} — previously saved data
     * 
     */
    constructor({data, readOnly}){
        this.data = data;
        this.readOnly = readOnly;
        this.wrapper = null;
        this.url = null;
        this.isEdited = false;
    }

    /**
     * 
     * Return tool's view
     * 
     * @returns {HTMLDivElement}
     * @public
     */
    render() {
        this.wrapper = document.createElement('div');
        const input = document.createElement('input');
        input.value = this.data && this.data.url ? this.data.url : '';
        input.placeholder = "Paste YouTube url here...";

        this.wrapper.classList.add('block-wrapper');
        this.wrapper.appendChild(input);
        this._createIframe(input.value);

        input.addEventListener('change', (event) => {
            this.isEdited = true;
            this.url = input.value;
            this._createIframe(input.value);
        });
        return this.wrapper;
    }

    /**
     * 
     * Create iframe for YouTube embed
     * @private
     * @param {string} url
     * 
     */
    _createIframe(url){        
        const videoId = url.match(/(?<=v=)[a-zA-Z0-9_]+(?=\&?)/);
        if (videoId == null) {
            if (this.isEdited) {
                this.wrapper.querySelector("input").classList.add("invalid");
            }
            return
        }

        this.wrapper.innerHTML = null;
        const plyrContainer = document.createElement('div');
        plyrContainer.classList.add("video-wrapper");

        const iframe = document.createElement('iframe');
        iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}`);
        iframe.setAttribute("allowfullscreen", true);

        plyrContainer.appendChild(iframe);
        this.wrapper.appendChild(plyrContainer);
    }

    /**
     * Returns true to notify the core that read-only mode is supported
     *
     * @return {boolean}
     */
    static get isReadOnlySupported() {
        return true;
    }


   /**
   * Return block data
   *
   * @public
   * @param {HTMLDivElement} blockContent - Block wrapper
   * @returns {object}
   */
    save(blockContent) {
        const input = blockContent.querySelector('input');
        return {
            url: this.url
        }
    }
}
