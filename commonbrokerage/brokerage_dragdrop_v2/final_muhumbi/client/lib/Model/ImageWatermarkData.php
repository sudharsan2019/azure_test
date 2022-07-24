<?php
/**
 * ImageWatermarkData
 *
 * PHP version 5
 *
 * @category Class
 * @package  MuhimbiPDFOnline\Client
 * @author   Swaagger Codegen team
 * @link     https://github.com/swagger-api/swagger-codegen
 */

/**
 * Muhimbi PDF
 *
 * Convert, Merge, Watermark, Secure and OCR files.
 *
 * OpenAPI spec version: 9.9
 * 
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 *
 */

/**
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */

namespace MuhimbiPDFOnline\Client\Model;

use \ArrayAccess;

/**
 * ImageWatermarkData Class Doc Comment
 *
 * @category    Class
 * @description Parameters for ImageWatermark operation
 * @package     MuhimbiPDFOnline\Client
 * @author      Swagger Codegen team
 * @link        https://github.com/swagger-api/swagger-codegen
 */
class ImageWatermarkData implements ArrayAccess
{
    const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      * @var string
      */
    protected static $swaggerModelName = 'image_watermark_data';

    /**
      * Array of property to type mappings. Used for (de)serialization
      * @var string[]
      */
    protected static $swaggerTypes = [
        'source_file_name' => 'string',
        'use_async_pattern' => 'bool',
        'source_file_content' => 'string',
        'image_file' => 'string',
        'sharepoint_file' => '\MuhimbiPDFOnline\Client\Model\SharepointFile',
        'position' => 'string',
        'width' => 'string',
        'height' => 'string',
        'x' => 'string',
        'y' => 'string',
        'layer' => 'string',
        'rotation' => 'string',
        'opacity' => 'string',
        'fill_color' => 'string',
        'line_color' => 'string',
        'line_width' => 'string',
        'start_page' => 'int',
        'end_page' => 'int',
        'page_interval' => 'int',
        'page_orientation' => 'string',
        'fail_on_error' => 'bool'
    ];

    public static function swaggerTypes()
    {
        return self::$swaggerTypes;
    }

    /**
     * Array of attributes where the key is the local name, and the value is the original name
     * @var string[]
     */
    protected static $attributeMap = [
        'source_file_name' => 'source_file_name',
        'use_async_pattern' => 'use_async_pattern',
        'source_file_content' => 'source_file_content',
        'image_file' => 'image_file',
        'sharepoint_file' => 'sharepoint_file',
        'position' => 'position',
        'width' => 'width',
        'height' => 'height',
        'x' => 'x',
        'y' => 'y',
        'layer' => 'layer',
        'rotation' => 'rotation',
        'opacity' => 'opacity',
        'fill_color' => 'fill_color',
        'line_color' => 'line_color',
        'line_width' => 'line_width',
        'start_page' => 'start_page',
        'end_page' => 'end_page',
        'page_interval' => 'page_interval',
        'page_orientation' => 'page_orientation',
        'fail_on_error' => 'fail_on_error'
    ];


    /**
     * Array of attributes to setter functions (for deserialization of responses)
     * @var string[]
     */
    protected static $setters = [
        'source_file_name' => 'setSourceFileName',
        'use_async_pattern' => 'setUseAsyncPattern',
        'source_file_content' => 'setSourceFileContent',
        'image_file' => 'setImageFile',
        'sharepoint_file' => 'setSharepointFile',
        'position' => 'setPosition',
        'width' => 'setWidth',
        'height' => 'setHeight',
        'x' => 'setX',
        'y' => 'setY',
        'layer' => 'setLayer',
        'rotation' => 'setRotation',
        'opacity' => 'setOpacity',
        'fill_color' => 'setFillColor',
        'line_color' => 'setLineColor',
        'line_width' => 'setLineWidth',
        'start_page' => 'setStartPage',
        'end_page' => 'setEndPage',
        'page_interval' => 'setPageInterval',
        'page_orientation' => 'setPageOrientation',
        'fail_on_error' => 'setFailOnError'
    ];


    /**
     * Array of attributes to getter functions (for serialization of requests)
     * @var string[]
     */
    protected static $getters = [
        'source_file_name' => 'getSourceFileName',
        'use_async_pattern' => 'getUseAsyncPattern',
        'source_file_content' => 'getSourceFileContent',
        'image_file' => 'getImageFile',
        'sharepoint_file' => 'getSharepointFile',
        'position' => 'getPosition',
        'width' => 'getWidth',
        'height' => 'getHeight',
        'x' => 'getX',
        'y' => 'getY',
        'layer' => 'getLayer',
        'rotation' => 'getRotation',
        'opacity' => 'getOpacity',
        'fill_color' => 'getFillColor',
        'line_color' => 'getLineColor',
        'line_width' => 'getLineWidth',
        'start_page' => 'getStartPage',
        'end_page' => 'getEndPage',
        'page_interval' => 'getPageInterval',
        'page_orientation' => 'getPageOrientation',
        'fail_on_error' => 'getFailOnError'
    ];

    public static function attributeMap()
    {
        return self::$attributeMap;
    }

    public static function setters()
    {
        return self::$setters;
    }

    public static function getters()
    {
        return self::$getters;
    }

    const POSITION_TOP_LEFT = 'Top Left';
    const POSITION_TOP_CENTER = 'Top Center';
    const POSITION_TOP_RIGHT = 'Top Right';
    const POSITION_MIDDLE_LEFT = 'Middle Left';
    const POSITION_MIDDLE_CENTER = 'Middle Center';
    const POSITION_MIDDLE_RIGHT = 'Middle Right';
    const POSITION_BOTTOM_LEFT = 'Bottom Left';
    const POSITION_BOTTOM_CENTER = 'Bottom Center';
    const POSITION_BOTTOM_RIGHT = 'Bottom Right';
    const POSITION_ABSOLUTE = 'Absolute';
    const POSITION_RANDOM = 'Random';
    const LAYER_BACKGROUND = 'Background';
    const LAYER_FOREGROUND = 'Foreground';
    const PAGE_ORIENTATION_PORTRAIT = 'Portrait';
    const PAGE_ORIENTATION_LANDSCAPE = 'Landscape';
    const PAGE_ORIENTATION_BOTH = 'Both';
    

    
    /**
     * Gets allowable values of the enum
     * @return string[]
     */
    public function getPositionAllowableValues()
    {
        return [
            self::POSITION_TOP_LEFT,
            self::POSITION_TOP_CENTER,
            self::POSITION_TOP_RIGHT,
            self::POSITION_MIDDLE_LEFT,
            self::POSITION_MIDDLE_CENTER,
            self::POSITION_MIDDLE_RIGHT,
            self::POSITION_BOTTOM_LEFT,
            self::POSITION_BOTTOM_CENTER,
            self::POSITION_BOTTOM_RIGHT,
            self::POSITION_ABSOLUTE,
            self::POSITION_RANDOM,
        ];
    }
    
    /**
     * Gets allowable values of the enum
     * @return string[]
     */
    public function getLayerAllowableValues()
    {
        return [
            self::LAYER_BACKGROUND,
            self::LAYER_FOREGROUND,
        ];
    }
    
    /**
     * Gets allowable values of the enum
     * @return string[]
     */
    public function getPageOrientationAllowableValues()
    {
        return [
            self::PAGE_ORIENTATION_PORTRAIT,
            self::PAGE_ORIENTATION_LANDSCAPE,
            self::PAGE_ORIENTATION_BOTH,
        ];
    }
    

    /**
     * Associative array for storing property values
     * @var mixed[]
     */
    protected $container = [];

    /**
     * Constructor
     * @param mixed[] $data Associated array of property values initializing the model
     */
    public function __construct(array $data = null)
    {
        $this->container['source_file_name'] = isset($data['source_file_name']) ? $data['source_file_name'] : null;
        $this->container['use_async_pattern'] = isset($data['use_async_pattern']) ? $data['use_async_pattern'] : false;
        $this->container['source_file_content'] = isset($data['source_file_content']) ? $data['source_file_content'] : null;
        $this->container['image_file'] = isset($data['image_file']) ? $data['image_file'] : null;
        $this->container['sharepoint_file'] = isset($data['sharepoint_file']) ? $data['sharepoint_file'] : null;
        $this->container['position'] = isset($data['position']) ? $data['position'] : 'Middle Center';
        $this->container['width'] = isset($data['width']) ? $data['width'] : null;
        $this->container['height'] = isset($data['height']) ? $data['height'] : null;
        $this->container['x'] = isset($data['x']) ? $data['x'] : null;
        $this->container['y'] = isset($data['y']) ? $data['y'] : null;
        $this->container['layer'] = isset($data['layer']) ? $data['layer'] : 'Foreground';
        $this->container['rotation'] = isset($data['rotation']) ? $data['rotation'] : null;
        $this->container['opacity'] = isset($data['opacity']) ? $data['opacity'] : '100';
        $this->container['fill_color'] = isset($data['fill_color']) ? $data['fill_color'] : null;
        $this->container['line_color'] = isset($data['line_color']) ? $data['line_color'] : null;
        $this->container['line_width'] = isset($data['line_width']) ? $data['line_width'] : null;
        $this->container['start_page'] = isset($data['start_page']) ? $data['start_page'] : null;
        $this->container['end_page'] = isset($data['end_page']) ? $data['end_page'] : null;
        $this->container['page_interval'] = isset($data['page_interval']) ? $data['page_interval'] : null;
        $this->container['page_orientation'] = isset($data['page_orientation']) ? $data['page_orientation'] : 'Both';
        $this->container['fail_on_error'] = isset($data['fail_on_error']) ? $data['fail_on_error'] : true;
    }

    /**
     * show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalid_properties = [];

        if ($this->container['source_file_content'] === null) {
            $invalid_properties[] = "'source_file_content' can't be null";
        }
        if ($this->container['image_file'] === null) {
            $invalid_properties[] = "'image_file' can't be null";
        }
        if ($this->container['position'] === null) {
            $invalid_properties[] = "'position' can't be null";
        }
        $allowed_values = ["Top Left", "Top Center", "Top Right", "Middle Left", "Middle Center", "Middle Right", "Bottom Left", "Bottom Center", "Bottom Right", "Absolute", "Random"];
        if (!in_array($this->container['position'], $allowed_values)) {
            $invalid_properties[] = "invalid value for 'position', must be one of 'Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Middle Center', 'Middle Right', 'Bottom Left', 'Bottom Center', 'Bottom Right', 'Absolute', 'Random'.";
        }

        if ($this->container['width'] === null) {
            $invalid_properties[] = "'width' can't be null";
        }
        if ($this->container['height'] === null) {
            $invalid_properties[] = "'height' can't be null";
        }
        $allowed_values = ["Background", "Foreground"];
        if (!in_array($this->container['layer'], $allowed_values)) {
            $invalid_properties[] = "invalid value for 'layer', must be one of 'Background', 'Foreground'.";
        }

        $allowed_values = ["Portrait", "Landscape", "Both"];
        if (!in_array($this->container['page_orientation'], $allowed_values)) {
            $invalid_properties[] = "invalid value for 'page_orientation', must be one of 'Portrait', 'Landscape', 'Both'.";
        }

        return $invalid_properties;
    }

    /**
     * validate all the properties in the model
     * return true if all passed
     *
     * @return bool True if all properties are valid
     */
    public function valid()
    {

        if ($this->container['source_file_content'] === null) {
            return false;
        }
        if ($this->container['image_file'] === null) {
            return false;
        }
        if ($this->container['position'] === null) {
            return false;
        }
        $allowed_values = ["Top Left", "Top Center", "Top Right", "Middle Left", "Middle Center", "Middle Right", "Bottom Left", "Bottom Center", "Bottom Right", "Absolute", "Random"];
        if (!in_array($this->container['position'], $allowed_values)) {
            return false;
        }
        if ($this->container['width'] === null) {
            return false;
        }
        if ($this->container['height'] === null) {
            return false;
        }
        $allowed_values = ["Background", "Foreground"];
        if (!in_array($this->container['layer'], $allowed_values)) {
            return false;
        }
        $allowed_values = ["Portrait", "Landscape", "Both"];
        if (!in_array($this->container['page_orientation'], $allowed_values)) {
            return false;
        }
        return true;
    }


    /**
     * Gets source_file_name
     * @return string
     */
    public function getSourceFileName()
    {
        return $this->container['source_file_name'];
    }

    /**
     * Sets source_file_name
     * @param string $source_file_name Optional file name (for logging purposes)
     * @return $this
     */
    public function setSourceFileName($source_file_name)
    {
        $this->container['source_file_name'] = $source_file_name;

        return $this;
    }

    /**
     * Gets use_async_pattern
     * @return bool
     */
    public function getUseAsyncPattern()
    {
        return $this->container['use_async_pattern'];
    }

    /**
     * Sets use_async_pattern
     * @param bool $use_async_pattern Use async behaviour for API request
     * @return $this
     */
    public function setUseAsyncPattern($use_async_pattern)
    {
        $this->container['use_async_pattern'] = $use_async_pattern;

        return $this;
    }

    /**
     * Gets source_file_content
     * @return string
     */
    public function getSourceFileContent()
    {
        return $this->container['source_file_content'];
    }

    /**
     * Sets source_file_content
     * @param string $source_file_content Content of the file to watermark
     * @return $this
     */
    public function setSourceFileContent($source_file_content)
    {
        $this->container['source_file_content'] = $source_file_content;

        return $this;
    }

    /**
     * Gets image_file
     * @return string
     */
    public function getImageFile()
    {
        return $this->container['image_file'];
    }

    /**
     * Sets image_file
     * @param string $image_file Image content or URL
     * @return $this
     */
    public function setImageFile($image_file)
    {
        $this->container['image_file'] = $image_file;

        return $this;
    }

    /**
     * Gets sharepoint_file
     * @return \MuhimbiPDFOnline\Client\Model\SharepointFile
     */
    public function getSharepointFile()
    {
        return $this->container['sharepoint_file'];
    }

    /**
     * Sets sharepoint_file
     * @param \MuhimbiPDFOnline\Client\Model\SharepointFile $sharepoint_file
     * @return $this
     */
    public function setSharepointFile($sharepoint_file)
    {
        $this->container['sharepoint_file'] = $sharepoint_file;

        return $this;
    }

    /**
     * Gets position
     * @return string
     */
    public function getPosition()
    {
        return $this->container['position'];
    }

    /**
     * Sets position
     * @param string $position Watermark position on the page
     * @return $this
     */
    public function setPosition($position)
    {
        $allowed_values = array('Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Middle Center', 'Middle Right', 'Bottom Left', 'Bottom Center', 'Bottom Right', 'Absolute', 'Random');
        if ((!in_array($position, $allowed_values))) {
            throw new \InvalidArgumentException("Invalid value for 'position', must be one of 'Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Middle Center', 'Middle Right', 'Bottom Left', 'Bottom Center', 'Bottom Right', 'Absolute', 'Random'");
        }
        $this->container['position'] = $position;

        return $this;
    }

    /**
     * Gets width
     * @return string
     */
    public function getWidth()
    {
        return $this->container['width'];
    }

    /**
     * Sets width
     * @param string $width Width of the watermark (in Pts, 1/72 of an inch)
     * @return $this
     */
    public function setWidth($width)
    {
        $this->container['width'] = $width;

        return $this;
    }

    /**
     * Gets height
     * @return string
     */
    public function getHeight()
    {
        return $this->container['height'];
    }

    /**
     * Sets height
     * @param string $height Height of the watermark (in Pts, 1/72 of an inch)
     * @return $this
     */
    public function setHeight($height)
    {
        $this->container['height'] = $height;

        return $this;
    }

    /**
     * Gets x
     * @return string
     */
    public function getX()
    {
        return $this->container['x'];
    }

    /**
     * Sets x
     * @param string $x X Coordinate of the watermark (in Pts, 1/72 of an inch)
     * @return $this
     */
    public function setX($x)
    {
        $this->container['x'] = $x;

        return $this;
    }

    /**
     * Gets y
     * @return string
     */
    public function getY()
    {
        return $this->container['y'];
    }

    /**
     * Sets y
     * @param string $y Y Coordinate of the watermark (in Pts, 1/72 of an inch)
     * @return $this
     */
    public function setY($y)
    {
        $this->container['y'] = $y;

        return $this;
    }

    /**
     * Gets layer
     * @return string
     */
    public function getLayer()
    {
        return $this->container['layer'];
    }

    /**
     * Sets layer
     * @param string $layer Watermark layer
     * @return $this
     */
    public function setLayer($layer)
    {
        $allowed_values = array('Background', 'Foreground');
        if (!is_null($layer) && (!in_array($layer, $allowed_values))) {
            throw new \InvalidArgumentException("Invalid value for 'layer', must be one of 'Background', 'Foreground'");
        }
        $this->container['layer'] = $layer;

        return $this;
    }

    /**
     * Gets rotation
     * @return string
     */
    public function getRotation()
    {
        return $this->container['rotation'];
    }

    /**
     * Sets rotation
     * @param string $rotation Angle of rotation
     * @return $this
     */
    public function setRotation($rotation)
    {
        $this->container['rotation'] = $rotation;

        return $this;
    }

    /**
     * Gets opacity
     * @return string
     */
    public function getOpacity()
    {
        return $this->container['opacity'];
    }

    /**
     * Sets opacity
     * @param string $opacity Opacity in % (100 is fully visible and 1 is barely visible)
     * @return $this
     */
    public function setOpacity($opacity)
    {
        $this->container['opacity'] = $opacity;

        return $this;
    }

    /**
     * Gets fill_color
     * @return string
     */
    public function getFillColor()
    {
        return $this->container['fill_color'];
    }

    /**
     * Sets fill_color
     * @param string $fill_color Color in #RRGGBB notation
     * @return $this
     */
    public function setFillColor($fill_color)
    {
        $this->container['fill_color'] = $fill_color;

        return $this;
    }

    /**
     * Gets line_color
     * @return string
     */
    public function getLineColor()
    {
        return $this->container['line_color'];
    }

    /**
     * Sets line_color
     * @param string $line_color Color in #RRGGBB notation
     * @return $this
     */
    public function setLineColor($line_color)
    {
        $this->container['line_color'] = $line_color;

        return $this;
    }

    /**
     * Gets line_width
     * @return string
     */
    public function getLineWidth()
    {
        return $this->container['line_width'];
    }

    /**
     * Sets line_width
     * @param string $line_width Width of the watermark outline (in Pts, 1/72 of an inch)
     * @return $this
     */
    public function setLineWidth($line_width)
    {
        $this->container['line_width'] = $line_width;

        return $this;
    }

    /**
     * Gets start_page
     * @return int
     */
    public function getStartPage()
    {
        return $this->container['start_page'];
    }

    /**
     * Sets start_page
     * @param int $start_page Number of the first page the watermark applies to
     * @return $this
     */
    public function setStartPage($start_page)
    {
        $this->container['start_page'] = $start_page;

        return $this;
    }

    /**
     * Gets end_page
     * @return int
     */
    public function getEndPage()
    {
        return $this->container['end_page'];
    }

    /**
     * Sets end_page
     * @param int $end_page Number of the last page the watermark applies to
     * @return $this
     */
    public function setEndPage($end_page)
    {
        $this->container['end_page'] = $end_page;

        return $this;
    }

    /**
     * Gets page_interval
     * @return int
     */
    public function getPageInterval()
    {
        return $this->container['page_interval'];
    }

    /**
     * Sets page_interval
     * @param int $page_interval Which pages to display the watermark on (1=every page, 2=every other, etc)
     * @return $this
     */
    public function setPageInterval($page_interval)
    {
        $this->container['page_interval'] = $page_interval;

        return $this;
    }

    /**
     * Gets page_orientation
     * @return string
     */
    public function getPageOrientation()
    {
        return $this->container['page_orientation'];
    }

    /**
     * Sets page_orientation
     * @param string $page_orientation Orientation of pages the watermark applies to.
     * @return $this
     */
    public function setPageOrientation($page_orientation)
    {
        $allowed_values = array('Portrait', 'Landscape', 'Both');
        if (!is_null($page_orientation) && (!in_array($page_orientation, $allowed_values))) {
            throw new \InvalidArgumentException("Invalid value for 'page_orientation', must be one of 'Portrait', 'Landscape', 'Both'");
        }
        $this->container['page_orientation'] = $page_orientation;

        return $this;
    }

    /**
     * Gets fail_on_error
     * @return bool
     */
    public function getFailOnError()
    {
        return $this->container['fail_on_error'];
    }

    /**
     * Sets fail_on_error
     * @param bool $fail_on_error Fail on error
     * @return $this
     */
    public function setFailOnError($fail_on_error)
    {
        $this->container['fail_on_error'] = $fail_on_error;

        return $this;
    }
    /**
     * Returns true if offset exists. False otherwise.
     * @param  integer $offset Offset
     * @return boolean
     */
    public function offsetExists($offset)
    {
        return isset($this->container[$offset]);
    }

    /**
     * Gets offset.
     * @param  integer $offset Offset
     * @return mixed
     */
    public function offsetGet($offset)
    {
        return isset($this->container[$offset]) ? $this->container[$offset] : null;
    }

    /**
     * Sets value based on offset.
     * @param  integer $offset Offset
     * @param  mixed   $value  Value to be set
     * @return void
     */
    public function offsetSet($offset, $value)
    {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }

    /**
     * Unsets offset.
     * @param  integer $offset Offset
     * @return void
     */
    public function offsetUnset($offset)
    {
        unset($this->container[$offset]);
    }

    /**
     * Gets the string presentation of the object
     * @return string
     */
    public function __toString()
    {
        if (defined('JSON_PRETTY_PRINT')) { // use JSON pretty print
            return json_encode(\MuhimbiPDFOnline\Client\ObjectSerializer::sanitizeForSerialization($this), JSON_PRETTY_PRINT);
        }

        return json_encode(\MuhimbiPDFOnline\Client\ObjectSerializer::sanitizeForSerialization($this));
    }
}


