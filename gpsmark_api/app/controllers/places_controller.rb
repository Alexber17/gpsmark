class PlacesController < ApplicationController
  before_action :set_place, only: [:show, :update, :destroy]

  # GET /places
  def index
    @places = Place.all
    
    render json: @places.to_json(include: :user)
  end

  # GET /places/1
  def show
    @places = Place.where(user_id: params[:id])
    
    render json: @places
  end

  # POST /places
  def create
    @place = Place.new(place_params)
    @place.user_id = params[:user_id]

    if @place.save
      render json: @place, status: :created 
    else
      render json: @place.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /places/1
  def update
    if @place.update(place_params)
      render json: @place
    else
      render json: @place.errors, status: :unprocessable_entity
    end
  end

  # DELETE /places/1
  def destroy
    @place.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_place
      @place = Place.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def place_params
      params.require(:place).permit(:nick_name, :addrees, :img , :user_id)
    end
end
